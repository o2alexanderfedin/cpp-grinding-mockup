import type { Issue } from '../types/issue'

// Helper to add metadata to issues
const addMetadata = (issue: Omit<Issue, 'discoveredAt' | 'lastUpdated' | 'status'>, daysAgo: number = 0): Issue => ({
  ...issue,
  discoveredAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
  lastUpdated: new Date().toISOString(),
  status: 'new',
})

// Stripe Payment Gateway Issues

const stripePaymentProcessorIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-1',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 45,
    title: 'Unchecked buffer copy in processPayment',
    description: 'Buffer overflow vulnerability in payment card number processing',
    codeSnippet: `void PaymentProcessor::processPayment(const char* cardNumber) {
    char buffer[16];
    strcpy(buffer, cardNumber);  // Line 45: BUG - No bounds checking

    if (validateCard(buffer)) {
        chargeAccount(buffer);
    }
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const cardNumber_len Int)
(declare-const buffer_size Int)
(assert (= buffer_size 16))
(assert (> cardNumber_len 16))
(assert (not (< cardNumber_len buffer_size)))
(check-sat)
; sat - proving overflow is possible when cardNumber_len > buffer_size`,
    simplifiedProof: `The buffer is 16 bytes, but cardNumber length is not checked. When cardNumber is longer than 16 bytes, strcpy will write beyond buffer bounds, corrupting memory.`,
    explanation: `This is a classic buffer overflow vulnerability. The strcpy function copies the entire cardNumber string into a fixed-size buffer without checking length. An attacker could provide a card number longer than 16 characters, causing a buffer overflow that could lead to arbitrary code execution or system crash. This is especially critical in payment processing where security is paramount.`,
    suggestedFix: `void PaymentProcessor::processPayment(const char* cardNumber) {
    char buffer[16];
    size_t len = strlen(cardNumber);
    if (len >= sizeof(buffer)) {
        throw std::invalid_argument("Card number too long");
    }
    strncpy(buffer, cardNumber, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';

    if (validateCard(buffer)) {
        chargeAccount(buffer);
    }
}`,
  },
  {
    id: 'issue-2',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 78,
    title: 'Null pointer dereference in findTransaction',
    description: 'Transaction lookup can return null but is used without checking',
    codeSnippet: `Transaction* PaymentProcessor::findTransaction(const std::string& txId) {
    Transaction* tx = transactionMap.get(txId);
    tx->setStatus(TransactionStatus::PROCESSING);  // Line 78: BUG - tx could be null

    return tx;
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-const tx Pointer)
(declare-const null Pointer)
(assert (= tx null))
(assert (distinct tx null))
(check-sat)
; unsat - contradiction proves tx can be null, causing undefined behavior`,
    simplifiedProof: `The transactionMap.get() method can return null when the transaction ID is not found, but the code immediately dereferences the pointer without checking if it's null.`,
    explanation: `This is a null pointer dereference vulnerability. When transactionMap.get() cannot find the requested transaction ID, it returns null. The code then immediately calls setStatus() on the null pointer, which causes undefined behavior and typically results in a segmentation fault. In a production payment system, this could cause service outages during high-traffic periods.`,
    suggestedFix: `Transaction* PaymentProcessor::findTransaction(const std::string& txId) {
    Transaction* tx = transactionMap.get(txId);
    if (tx == nullptr) {
        throw std::runtime_error("Transaction not found: " + txId);
    }
    tx->setStatus(TransactionStatus::PROCESSING);

    return tx;
}`,
  },
  {
    id: 'issue-3',
    severity: 'high',
    category: 'undefined-behavior',
    file: '/src/PaymentProcessor.cpp',
    line: 112,
    title: 'Integer overflow in calculateTotal',
    description: 'Addition of large amounts can overflow without detection',
    codeSnippet: `uint64_t PaymentProcessor::calculateTotal(uint64_t amount, uint64_t fee) {
    return amount + fee;  // Line 112: BUG - Can overflow
}`,
    smtLibProof: `(set-logic QF_BV)
(declare-const amount (_ BitVec 64))
(declare-const fee (_ BitVec 64))
(declare-const sum (_ BitVec 64))
(assert (= sum (bvadd amount fee)))
(assert (bvult sum amount))
(check-sat)
; sat - proving sum < amount indicates overflow occurred`,
    simplifiedProof: `When adding two 64-bit unsigned integers, the result can exceed the maximum value (2^64 - 1), causing the sum to wrap around to a small value. This means the calculated total could be less than either the amount or the fee.`,
    explanation: `This is an integer overflow vulnerability in financial calculations. When processing very large payment amounts, the addition could overflow the 64-bit unsigned integer type, wrapping around to a small value. This could allow an attacker to manipulate payment amounts, potentially charging significantly less than intended or causing accounting discrepancies.`,
    suggestedFix: `uint64_t PaymentProcessor::calculateTotal(uint64_t amount, uint64_t fee) {
    if (amount > UINT64_MAX - fee) {
        throw std::overflow_error("Payment amount too large");
    }
    return amount + fee;
}`,
  },
  {
    id: 'issue-4',
    severity: 'high',
    category: 'memory-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 156,
    title: 'Use-after-free in processQueue',
    description: 'Request pointer used after being deleted',
    codeSnippet: `void PaymentProcessor::processQueue() {
    Request* req = queue.pop();
    delete req;
    logger.log("Processed request: " + req->id);  // Line 156: BUG - Using deleted pointer
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-sort State 0)
(declare-fun deleted (Pointer State) Bool)
(declare-const req Pointer)
(declare-const s1 State)
(declare-const s2 State)
(assert (deleted req s2))
(assert (not (deleted req s1)))
(check-sat)
; sat - proving pointer is used after deletion`,
    simplifiedProof: `The request pointer 'req' is deleted with 'delete req', but then immediately accessed to read its 'id' field for logging. Accessing memory after it has been freed is undefined behavior.`,
    explanation: `This is a use-after-free vulnerability. After deleting the Request object, its memory is freed and potentially reallocated. Accessing req->id after deletion reads from freed memory, which may contain garbage data or may have been reused for another object. This can lead to crashes, data corruption, or security vulnerabilities if an attacker can control the freed memory contents.`,
    suggestedFix: `void PaymentProcessor::processQueue() {
    Request* req = queue.pop();
    std::string requestId = req->id;  // Copy ID before deletion
    delete req;
    logger.log("Processed request: " + requestId);
}`,
  },
  {
    id: 'issue-5',
    severity: 'high',
    category: 'concurrency',
    file: '/src/PaymentProcessor.cpp',
    line: 203,
    title: 'Race condition in updateBalance',
    description: 'Shared balance modified without synchronization',
    codeSnippet: `void PaymentProcessor::updateBalance(Account& account, int64_t delta) {
    int64_t current = account.balance;  // Line 203: BUG - Race condition
    account.balance = current + delta;
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const balance_t1 Int)
(declare-const balance_t2 Int)
(declare-const delta1 Int)
(declare-const delta2 Int)
(assert (= balance_t1 100))
(assert (= balance_t2 100))
(assert (or
  (= balance_t1 (+ 100 delta1 delta2))
  (= balance_t1 (+ 100 delta1))
  (= balance_t1 (+ 100 delta2))))
(check-sat)
; sat - proving lost update is possible in concurrent execution`,
    simplifiedProof: `When two threads read the current balance simultaneously, then both calculate and write new balances, one update will be lost. For example, if balance is 100 and two threads add 50 each, the final balance might be 150 instead of 200.`,
    explanation: `This is a race condition in concurrent balance updates. The read-modify-write operation is not atomic, so when multiple threads update the same account simultaneously, updates can be lost. This is a critical issue in payment processing where accurate balance tracking is essential for financial integrity and fraud prevention.`,
    suggestedFix: `void PaymentProcessor::updateBalance(Account& account, int64_t delta) {
    std::lock_guard<std::mutex> lock(account.mutex);
    int64_t current = account.balance;
    account.balance = current + delta;
}`,
  },
  {
    id: 'issue-6',
    severity: 'medium',
    category: 'memory-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 245,
    title: 'Array index out of bounds',
    description: 'Currency code array accessed without bounds checking',
    codeSnippet: `const char* PaymentProcessor::getCurrencySymbol(int code) {
    const char* symbols[] = {"$", "€", "£", "¥"};
    return symbols[code];  // Line 245: BUG - No bounds checking
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const code Int)
(declare-const array_size Int)
(assert (= array_size 4))
(assert (or (< code 0) (>= code array_size)))
(check-sat)
; sat - proving out-of-bounds access is possible`,
    simplifiedProof: `The symbols array has 4 elements (indices 0-3), but the code parameter is used as an index without checking if it's within the valid range of 0 to 3.`,
    explanation: `This is an array index out-of-bounds vulnerability. If the code parameter is negative or greater than 3, accessing symbols[code] reads memory outside the array bounds. This causes undefined behavior and could lead to crashes or information disclosure if out-of-bounds memory is accessed.`,
    suggestedFix: `const char* PaymentProcessor::getCurrencySymbol(int code) {
    const char* symbols[] = {"$", "€", "£", "¥"};
    if (code < 0 || code >= 4) {
        throw std::out_of_range("Invalid currency code");
    }
    return symbols[code];
}`,
  },
  {
    id: 'issue-7',
    severity: 'medium',
    category: 'type-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 289,
    title: 'Unsafe type cast in processResponse',
    description: 'Downcasting without type checking',
    codeSnippet: `void PaymentProcessor::processResponse(Response* resp) {
    PaymentResponse* payResp = static_cast<PaymentResponse*>(resp);  // Line 289: BUG - Unsafe cast
    applyPayment(payResp->amount);
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Type 0)
(declare-sort Pointer 0)
(declare-fun typeOf (Pointer) Type)
(declare-const resp Pointer)
(declare-const PaymentResponse Type)
(declare-const OtherResponse Type)
(assert (= (typeOf resp) OtherResponse))
(assert (distinct PaymentResponse OtherResponse))
(check-sat)
; sat - proving resp may not be PaymentResponse type`,
    simplifiedProof: `The Response pointer is cast to PaymentResponse without checking if it actually points to a PaymentResponse object. If resp points to a different Response subtype, accessing payResp->amount reads memory at an incorrect offset.`,
    explanation: `This is a type-safety violation using static_cast for downcasting. If the Response object is not actually a PaymentResponse, the cast succeeds but the object layout is wrong, leading to reading garbage data or causing memory corruption. This could result in incorrect payment processing or security vulnerabilities.`,
    suggestedFix: `void PaymentProcessor::processResponse(Response* resp) {
    PaymentResponse* payResp = dynamic_cast<PaymentResponse*>(resp);
    if (payResp == nullptr) {
        throw std::bad_cast("Expected PaymentResponse");
    }
    applyPayment(payResp->amount);
}`,
  },
  {
    id: 'issue-8',
    severity: 'low',
    category: 'memory-safety',
    file: '/src/PaymentProcessor.cpp',
    line: 334,
    title: 'Memory leak in createSession',
    description: 'Allocated memory not freed on early return',
    codeSnippet: `Session* PaymentProcessor::createSession(const std::string& userId) {
    Session* session = new Session(userId);
    if (!validateUser(userId)) {
        return nullptr;  // Line 334: BUG - session leaked
    }
    return session;
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-fun allocated (Pointer) Bool)
(declare-fun freed (Pointer) Bool)
(declare-const session Pointer)
(assert (allocated session))
(assert (not (freed session)))
(check-sat)
; sat - proving allocated memory is not freed on error path`,
    simplifiedProof: `A Session object is allocated with 'new', but if the user validation fails, the function returns nullptr without deleting the session, causing a memory leak.`,
    explanation: `This is a memory leak on an error path. When validateUser() returns false, the function returns nullptr but forgets to delete the already-allocated Session object. While a single leak is small, in a high-traffic payment system, this could accumulate and cause memory exhaustion over time.`,
    suggestedFix: `Session* PaymentProcessor::createSession(const std::string& userId) {
    if (!validateUser(userId)) {
        return nullptr;
    }
    Session* session = new Session(userId);
    return session;
    // Or use std::unique_ptr for automatic cleanup
}`,
  },
]

const stripeTransactionManagerIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-9',
    severity: 'critical',
    category: 'concurrency',
    file: '/src/TransactionManager.cpp',
    line: 67,
    title: 'Deadlock in transferFunds',
    description: 'Circular lock acquisition between two accounts',
    codeSnippet: `void TransactionManager::transferFunds(Account& from, Account& to, uint64_t amount) {
    std::lock_guard<std::mutex> lock1(from.mutex);
    std::lock_guard<std::mutex> lock2(to.mutex);  // Line 67: BUG - Potential deadlock

    from.balance -= amount;
    to.balance += amount;
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Thread 0)
(declare-sort Lock 0)
(declare-fun holds (Thread Lock) Bool)
(declare-fun waits (Thread Lock) Bool)
(declare-const t1 Thread)
(declare-const t2 Thread)
(declare-const lock_a Lock)
(declare-const lock_b Lock)
(assert (holds t1 lock_a))
(assert (waits t1 lock_b))
(assert (holds t2 lock_b))
(assert (waits t2 lock_a))
(check-sat)
; sat - proving circular wait condition (deadlock)`,
    simplifiedProof: `If thread 1 calls transferFunds(A, B) while thread 2 calls transferFunds(B, A), thread 1 locks A and waits for B, while thread 2 locks B and waits for A. This circular dependency creates a deadlock where both threads wait forever.`,
    explanation: `This is a classic deadlock scenario. When two threads try to transfer funds between the same two accounts in opposite directions, they can lock the accounts in different orders, creating a circular wait condition. This causes both threads to hang indefinitely, potentially freezing the entire payment processing system.`,
    suggestedFix: `void TransactionManager::transferFunds(Account& from, Account& to, uint64_t amount) {
    // Always lock in consistent order (by address)
    std::mutex& first = (&from < &to) ? from.mutex : to.mutex;
    std::mutex& second = (&from < &to) ? to.mutex : from.mutex;

    std::lock_guard<std::mutex> lock1(first);
    std::lock_guard<std::mutex> lock2(second);

    from.balance -= amount;
    to.balance += amount;
}`,
  },
  {
    id: 'issue-10',
    severity: 'high',
    category: 'undefined-behavior',
    file: '/src/TransactionManager.cpp',
    line: 123,
    title: 'Signed integer overflow in calculateFee',
    description: 'Multiplication can overflow signed integer',
    codeSnippet: `int64_t TransactionManager::calculateFee(int64_t amount, int32_t basisPoints) {
    return (amount * basisPoints) / 10000;  // Line 123: BUG - Overflow before division
}`,
    smtLibProof: `(set-logic QF_BV)
(declare-const amount (_ BitVec 64))
(declare-const basisPoints (_ BitVec 32))
(declare-const product (_ BitVec 64))
(assert (= product (bvmul amount ((_ sign_extend 32) basisPoints))))
(assert (or
  (and (bvsgt amount #x0000000000000000) (bvsgt product #x0000000000000000) (bvslt (bvsdiv product amount) ((_ sign_extend 32) basisPoints)))
  (and (bvslt amount #x0000000000000000) (bvslt product #x0000000000000000) (bvsgt (bvsdiv product amount) ((_ sign_extend 32) basisPoints)))))
(check-sat)
; sat - proving signed overflow is possible`,
    simplifiedProof: `When multiplying a large amount by basis points, the intermediate result can exceed INT64_MAX before the division, causing signed integer overflow which is undefined behavior in C++.`,
    explanation: `This is a signed integer overflow vulnerability in fee calculation. For large transaction amounts, the multiplication amount * basisPoints can overflow before the division by 10000 is applied. In C++, signed integer overflow is undefined behavior and can lead to incorrect fee calculations or program crashes.`,
    suggestedFix: `int64_t TransactionManager::calculateFee(int64_t amount, int32_t basisPoints) {
    // Check for potential overflow before multiplication
    if (amount > INT64_MAX / basisPoints) {
        throw std::overflow_error("Fee calculation would overflow");
    }
    return (amount * basisPoints) / 10000;
}`,
  },
  {
    id: 'issue-11',
    severity: 'high',
    category: 'memory-safety',
    file: '/src/TransactionManager.cpp',
    line: 178,
    title: 'Double free in rollbackTransaction',
    description: 'Transaction resources freed multiple times',
    codeSnippet: `void TransactionManager::rollbackTransaction(Transaction* tx) {
    if (tx->state == FAILED) {
        delete tx->resources;  // Line 178: BUG - Might be already freed
    }
    delete tx->resources;
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-fun freed (Pointer) Bool)
(declare-const resources Pointer)
(assert (freed resources))
(assert (freed resources))
(check-sat)
; sat - proving double free is possible`,
    simplifiedProof: `If tx->state is FAILED, the resources are deleted once in the if block, then deleted again after the if block. Freeing the same memory twice causes undefined behavior.`,
    explanation: `This is a double-free vulnerability. When a transaction is in FAILED state, the resources are freed twice - once inside the if block and once after it. Double-freeing memory corrupts the heap allocator's internal data structures and can lead to crashes or security vulnerabilities that enable heap exploitation.`,
    suggestedFix: `void TransactionManager::rollbackTransaction(Transaction* tx) {
    if (tx->state != FAILED && tx->resources != nullptr) {
        delete tx->resources;
        tx->resources = nullptr;
    }
}`,
  },
  {
    id: 'issue-12',
    severity: 'medium',
    category: 'memory-safety',
    file: '/src/TransactionManager.cpp',
    line: 234,
    title: 'Dangling pointer in transaction callback',
    description: 'Pointer to stack variable returned',
    codeSnippet: `TransactionResult* TransactionManager::processAsync(const Request& req) {
    TransactionResult result;
    result.status = processRequest(req);
    return &result;  // Line 234: BUG - Returning pointer to stack variable
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-sort Scope 0)
(declare-fun validIn (Pointer Scope) Bool)
(declare-const result_ptr Pointer)
(declare-const caller_scope Scope)
(declare-const callee_scope Scope)
(assert (validIn result_ptr callee_scope))
(assert (not (validIn result_ptr caller_scope)))
(check-sat)
; sat - proving pointer invalid after function returns`,
    simplifiedProof: `The 'result' variable is allocated on the stack and will be destroyed when the function returns. Returning a pointer to this stack variable creates a dangling pointer that points to invalid memory in the caller.`,
    explanation: `This is a dangling pointer bug. The TransactionResult object is allocated on the stack and destroyed when the function returns, but a pointer to it is returned to the caller. Accessing this pointer reads from invalid memory that may have been reused for other purposes, leading to undefined behavior and crashes.`,
    suggestedFix: `TransactionResult* TransactionManager::processAsync(const Request& req) {
    TransactionResult* result = new TransactionResult();
    result->status = processRequest(req);
    return result;
    // Or better: return by value or use std::unique_ptr
}`,
  },
  {
    id: 'issue-13',
    severity: 'medium',
    category: 'undefined-behavior',
    file: '/src/TransactionManager.cpp',
    line: 289,
    title: 'Uninitialized variable in retry logic',
    description: 'Variable used before initialization',
    codeSnippet: `bool TransactionManager::retryTransaction(Transaction* tx) {
    int attempts;
    while (attempts < MAX_RETRIES) {  // Line 289: BUG - attempts not initialized
        if (executeTransaction(tx)) return true;
        attempts++;
    }
    return false;
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const attempts_initial Int)
(declare-const MAX_RETRIES Int)
(assert (= MAX_RETRIES 3))
(assert (not (and (>= attempts_initial 0) (<= attempts_initial 2))))
(check-sat)
; sat - proving attempts can have arbitrary initial value`,
    simplifiedProof: `The variable 'attempts' is declared but not initialized. Its initial value is undefined and could be any value, causing the while loop condition to behave unpredictably.`,
    explanation: `This is an uninitialized variable bug. The 'attempts' variable is declared but not initialized before being used in the while condition. In C++, local variables have undefined initial values, so the loop might execute zero times, the correct number of times, or any arbitrary number of times depending on whatever garbage value happens to be in memory.`,
    suggestedFix: `bool TransactionManager::retryTransaction(Transaction* tx) {
    int attempts = 0;  // Initialize to 0
    while (attempts < MAX_RETRIES) {
        if (executeTransaction(tx)) return true;
        attempts++;
    }
    return false;
}`,
  },
  {
    id: 'issue-14',
    severity: 'low',
    category: 'type-safety',
    file: '/src/TransactionManager.cpp',
    line: 345,
    title: 'Narrowing conversion loses precision',
    description: 'Converting 64-bit timestamp to 32-bit loses data',
    codeSnippet: `void TransactionManager::logTransaction(int64_t timestamp, const Transaction& tx) {
    int32_t logTime = timestamp;  // Line 345: BUG - Narrowing conversion
    logger.write(logTime, tx.id);
}`,
    smtLibProof: `(set-logic QF_BV)
(declare-const timestamp (_ BitVec 64))
(declare-const logTime (_ BitVec 32))
(assert (= logTime ((_ extract 31 0) timestamp)))
(assert (not (= timestamp ((_ sign_extend 32) logTime))))
(check-sat)
; sat - proving information loss in narrowing conversion`,
    simplifiedProof: `Converting a 64-bit timestamp to 32-bit truncates the upper 32 bits. For timestamps after January 19, 2038 (Unix epoch overflow), the upper bits are non-zero and information is lost, resulting in an incorrect timestamp.`,
    explanation: `This is a narrowing conversion bug that loses precision. Converting a 64-bit Unix timestamp to 32-bit will truncate the upper 32 bits, causing incorrect timestamps for dates beyond 2038 (the "Year 2038 problem"). While this seems far away, payment systems need to handle future-dated transactions and scheduled payments correctly.`,
    suggestedFix: `void TransactionManager::logTransaction(int64_t timestamp, const Transaction& tx) {
    logger.write(timestamp, tx.id);  // Use 64-bit timestamp directly
}`,
  },
]

const stripeCryptoIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-15',
    severity: 'high',
    category: 'memory-safety',
    file: '/src/security/Crypto.cpp',
    line: 89,
    title: 'Sensitive data not zeroed before free',
    description: 'Encryption key remains in memory after use',
    codeSnippet: `void Crypto::encryptData(const uint8_t* data, size_t len) {
    uint8_t* key = new uint8_t[32];
    generateKey(key, 32);
    // ... use key for encryption ...
    delete[] key;  // Line 89: BUG - Key not zeroed before deletion
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Memory 0)
(declare-fun contains (Memory) Bool)
(declare-const mem_before_free Memory)
(declare-const mem_after_free Memory)
(assert (contains mem_before_free))
(assert (contains mem_after_free))
(check-sat)
; sat - proving sensitive data persists in memory`,
    simplifiedProof: `After deleting the key array, the key data remains in memory until that memory is reused. This creates a window where the encryption key could be read through memory dumps or exploits.`,
    explanation: `This is a sensitive data exposure vulnerability. When the encryption key is freed without being zeroed, the key material remains in memory and could be recovered through memory dumps, core dumps, or memory disclosure vulnerabilities. This is especially critical in payment processing where encryption keys protect sensitive cardholder data.`,
    suggestedFix: `void Crypto::encryptData(const uint8_t* data, size_t len) {
    uint8_t* key = new uint8_t[32];
    generateKey(key, 32);
    // ... use key for encryption ...

    // Zero the key before freeing
    std::memset(key, 0, 32);
    delete[] key;
}`,
  },
  {
    id: 'issue-16',
    severity: 'high',
    category: 'undefined-behavior',
    file: '/src/security/Crypto.cpp',
    line: 134,
    title: 'Buffer underflow in decryptBlock',
    description: 'Negative offset can underflow buffer',
    codeSnippet: `void Crypto::decryptBlock(uint8_t* buffer, int offset, size_t blockSize) {
    uint8_t* blockStart = buffer + offset;  // Line 134: BUG - offset not validated
    decryptAES(blockStart, blockSize);
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const offset Int)
(declare-const buffer_start Int)
(assert (< offset 0))
(assert (= buffer_start (+ buffer_start offset)))
(check-sat)
; sat - proving negative offset causes underflow`,
    simplifiedProof: `If the offset parameter is negative, the pointer arithmetic 'buffer + offset' points before the buffer's start, accessing memory outside the buffer bounds.`,
    explanation: `This is a buffer underflow vulnerability. If offset is negative, the pointer arithmetic creates a pointer that points before the start of the buffer. Accessing memory before a buffer is undefined behavior and can lead to information disclosure, crashes, or memory corruption.`,
    suggestedFix: `void Crypto::decryptBlock(uint8_t* buffer, int offset, size_t blockSize) {
    if (offset < 0) {
        throw std::invalid_argument("Offset cannot be negative");
    }
    uint8_t* blockStart = buffer + offset;
    decryptAES(blockStart, blockSize);
}`,
  },
  {
    id: 'issue-17',
    severity: 'medium',
    category: 'concurrency',
    file: '/src/security/Crypto.cpp',
    line: 189,
    title: 'Non-atomic RNG state update',
    description: 'Random number generator state has race condition',
    codeSnippet: `uint32_t Crypto::generateRandom() {
    rngState = (rngState * 1103515245 + 12345) & 0x7fffffff;  // Line 189: BUG - Not atomic
    return rngState;
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const state_t1 Int)
(declare-const state_t2 Int)
(declare-const expected Int)
(assert (= state_t1 100))
(assert (= state_t2 100))
(assert (not (= state_t1 expected)))
(check-sat)
; sat - proving non-atomic update can corrupt state`,
    simplifiedProof: `When two threads call generateRandom() simultaneously, both read the same state, compute new values, and write back. The second write overwrites the first, corrupting the RNG state sequence.`,
    explanation: `This is a race condition in random number generation. The read-modify-write of rngState is not atomic, so concurrent calls can corrupt the RNG state. This is critical in cryptographic operations where the unpredictability of random numbers is essential for security.`,
    suggestedFix: `uint32_t Crypto::generateRandom() {
    static std::mutex rng_mutex;
    std::lock_guard<std::mutex> lock(rng_mutex);
    rngState = (rngState * 1103515245 + 12345) & 0x7fffffff;
    return rngState;
}`,
  },
  {
    id: 'issue-18',
    severity: 'low',
    category: 'memory-safety',
    file: '/src/security/Crypto.cpp',
    line: 245,
    title: 'Stack buffer overflow in hashPassword',
    description: 'Fixed-size stack buffer vulnerable to overflow',
    codeSnippet: `void Crypto::hashPassword(const char* password) {
    char salt[32];
    sprintf(salt, "%s_%ld", password, time(nullptr));  // Line 245: BUG - Buffer overflow
    hashSHA256(salt);
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const password_len Int)
(declare-const timestamp_len Int)
(declare-const buffer_size Int)
(assert (= buffer_size 32))
(assert (> (+ password_len timestamp_len 1) buffer_size))
(check-sat)
; sat - proving overflow possible when password is long`,
    simplifiedProof: `The sprintf call writes password + "_" + timestamp into a 32-byte buffer. If password is longer than about 20 characters, the sprintf will write beyond the buffer bounds.`,
    explanation: `This is a stack buffer overflow vulnerability. The sprintf function does not check the destination buffer size, so a long password combined with the timestamp can overflow the 32-byte salt buffer on the stack. This can corrupt adjacent stack variables or the return address, potentially leading to code execution.`,
    suggestedFix: `void Crypto::hashPassword(const char* password) {
    char salt[256];  // Increase buffer size
    snprintf(salt, sizeof(salt), "%s_%ld", password, time(nullptr));
    hashSHA256(salt);
}`,
  },
]

// Meta Compiler Optimizer Issues

const metaPassManagerIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-19',
    severity: 'critical',
    category: 'memory-safety',
    file: '/src/optimizer/PassManager.cpp',
    line: 112,
    title: 'Iterator invalidation in removePass',
    description: 'Erasing from container while iterating',
    codeSnippet: `void PassManager::removePass(const std::string& passName) {
    for (auto it = passes.begin(); it != passes.end(); ++it) {
        if ((*it)->getName() == passName) {
            passes.erase(it);  // Line 112: BUG - Invalidates iterator
        }
    }
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Iterator 0)
(declare-fun valid (Iterator) Bool)
(declare-const it Iterator)
(assert (valid it))
(assert (not (valid it)))
(check-sat)
; unsat - proving iterator becomes invalid after erase`,
    simplifiedProof: `After calling erase(it), the iterator 'it' is invalidated and cannot be safely incremented in the next loop iteration. This causes undefined behavior.`,
    explanation: `This is an iterator invalidation bug. When erase() is called, it invalidates the iterator, but the loop continues to use the invalidated iterator with ++it. This causes undefined behavior, typically leading to crashes or memory corruption. The compiler optimizer relies on this code being correct, so bugs here can propagate to optimized code.`,
    suggestedFix: `void PassManager::removePass(const std::string& passName) {
    for (auto it = passes.begin(); it != passes.end(); ) {
        if ((*it)->getName() == passName) {
            it = passes.erase(it);  // erase returns next valid iterator
        } else {
            ++it;
        }
    }
}`,
  },
  {
    id: 'issue-20',
    severity: 'high',
    category: 'undefined-behavior',
    file: '/src/optimizer/PassManager.cpp',
    line: 167,
    title: 'Shift amount exceeds bit width',
    description: 'Left shift by value >= type width is undefined',
    codeSnippet: `uint32_t PassManager::encodePassFlags(const PassInfo& info) {
    uint32_t flags = 0;
    flags |= (1 << info.priority);  // Line 167: BUG - priority might be >= 32
    return flags;
}`,
    smtLibProof: `(set-logic QF_BV)
(declare-const priority (_ BitVec 32))
(declare-const flags (_ BitVec 32))
(assert (bvuge priority #x00000020))
(assert (= flags (bvshl #x00000001 priority)))
(check-sat)
; sat - proving shift by >= 32 is undefined for 32-bit type`,
    simplifiedProof: `For a 32-bit integer, shifting left by 32 or more bits is undefined behavior in C++. If info.priority is 32 or greater, the shift operation has undefined behavior.`,
    explanation: `This is an undefined behavior due to excessive shift amount. In C++, shifting a value by an amount greater than or equal to the bit width of the type is undefined behavior. This can produce unpredictable results across different compilers and optimization levels, which is especially problematic in a compiler itself.`,
    suggestedFix: `uint32_t PassManager::encodePassFlags(const PassInfo& info) {
    uint32_t flags = 0;
    if (info.priority < 32) {
        flags |= (1 << info.priority);
    }
    return flags;
}`,
  },
  {
    id: 'issue-21',
    severity: 'high',
    category: 'type-safety',
    file: '/src/optimizer/PassManager.cpp',
    line: 223,
    title: 'Strict aliasing violation in typecast',
    description: 'Type-punning through pointer cast violates strict aliasing',
    codeSnippet: `float PassManager::getMetric(void* data) {
    uint32_t* intPtr = reinterpret_cast<uint32_t*>(data);
    float* floatPtr = reinterpret_cast<float*>(intPtr);  // Line 223: BUG - Strict aliasing violation
    return *floatPtr;
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Type 0)
(declare-sort Pointer 0)
(declare-fun typeOf (Pointer) Type)
(declare-const ptr Pointer)
(declare-const uint32_t_type Type)
(declare-const float_type Type)
(assert (= (typeOf ptr) uint32_t_type))
(assert (distinct uint32_t_type float_type))
(check-sat)
; sat - proving type aliasing violation`,
    simplifiedProof: `The code casts data to uint32_t*, then immediately casts it to float*. Accessing the same memory through pointers of different types violates the strict aliasing rule, allowing the compiler to make incorrect optimization assumptions.`,
    explanation: `This is a strict aliasing violation. C++ compilers assume that pointers to different types don't alias (point to the same memory), and use this assumption for optimizations. This code violates that assumption by accessing the same memory through both uint32_t* and float*, which can cause the compiler to generate incorrect optimized code.`,
    suggestedFix: `float PassManager::getMetric(void* data) {
    float result;
    std::memcpy(&result, data, sizeof(float));
    return result;
}`,
  },
  {
    id: 'issue-22',
    severity: 'medium',
    category: 'memory-safety',
    file: '/src/optimizer/PassManager.cpp',
    line: 278,
    title: 'Potential buffer overflow in copyName',
    description: 'Fixed-size buffer with unbounded string copy',
    codeSnippet: `void PassManager::copyName(const std::string& name) {
    char buffer[64];
    strcpy(buffer, name.c_str());  // Line 278: BUG - No size check
    // ... use buffer ...
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const name_length Int)
(declare-const buffer_size Int)
(assert (= buffer_size 64))
(assert (> name_length buffer_size))
(check-sat)
; sat - proving overflow when name is too long`,
    simplifiedProof: `If the name string is longer than 63 characters (need room for null terminator), strcpy will write beyond the 64-byte buffer, causing a buffer overflow.`,
    explanation: `This is a buffer overflow vulnerability. The strcpy function copies the entire string without checking the destination buffer size. If a pass name exceeds 63 characters, strcpy writes beyond the buffer bounds, corrupting stack memory and potentially enabling code execution.`,
    suggestedFix: `void PassManager::copyName(const std::string& name) {
    char buffer[64];
    strncpy(buffer, name.c_str(), sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';
    // ... use buffer ...
}`,
  },
]

const metaDeadCodeEliminationIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-23',
    severity: 'high',
    category: 'undefined-behavior',
    file: '/src/optimizer/DeadCodeElimination.cpp',
    line: 89,
    title: 'Pointer arithmetic on null pointer',
    description: 'Calculating offset from null pointer is undefined',
    codeSnippet: `size_t DeadCodeElimination::getFieldOffset(const StructType* type, int fieldIdx) {
    FieldType* base = nullptr;
    FieldType* field = base + fieldIdx;  // Line 89: BUG - Null pointer arithmetic
    return reinterpret_cast<size_t>(field);
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-const null Pointer)
(declare-const result Pointer)
(declare-const offset Int)
(assert (= result (+ null offset)))
(check-sat)
; sat - proving pointer arithmetic on null is undefined`,
    simplifiedProof: `Performing pointer arithmetic on a null pointer is undefined behavior, even if the result is never dereferenced. The calculation 'nullptr + fieldIdx' has undefined behavior.`,
    explanation: `This is undefined behavior from null pointer arithmetic. While this code tries to compute field offsets without dereferencing, performing arithmetic on a null pointer is undefined in C++. The compiler is allowed to optimize based on the assumption that pointer arithmetic is only done on valid pointers, which can lead to incorrect code generation.`,
    suggestedFix: `size_t DeadCodeElimination::getFieldOffset(const StructType* type, int fieldIdx) {
    return offsetof(FieldType, field[fieldIdx]);
    // Or use proper struct introspection
}`,
  },
  {
    id: 'issue-24',
    severity: 'medium',
    category: 'concurrency',
    file: '/src/optimizer/DeadCodeElimination.cpp',
    line: 145,
    title: 'Time-of-check to time-of-use race',
    description: 'Block checked then used without synchronization',
    codeSnippet: `void DeadCodeElimination::removeBlock(BasicBlock* block) {
    if (!isBlockDead(block)) {  // Line 145: Check
        return;
    }
    block->removeFromParent();  // Line 147: Use - BUG: TOCTOU race
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort State 0)
(declare-fun isDead (State) Bool)
(declare-const s1 State)
(declare-const s2 State)
(assert (isDead s1))
(assert (not (isDead s2)))
(check-sat)
; sat - proving block state can change between check and use`,
    simplifiedProof: `Between checking if the block is dead (line 145) and removing it (line 147), another thread could modify the block, making it no longer dead. This creates a time-of-check to time-of-use race condition.`,
    explanation: `This is a time-of-check to time-of-use (TOCTOU) race condition. In multi-threaded compilation, the block's dead status could change between the check and the removal. This could lead to incorrectly removing live code blocks, corrupting the optimized program.`,
    suggestedFix: `void DeadCodeElimination::removeBlock(BasicBlock* block) {
    std::lock_guard<std::mutex> lock(block->mutex);
    if (!isBlockDead(block)) {
        return;
    }
    block->removeFromParent();
}`,
  },
  {
    id: 'issue-25',
    severity: 'low',
    category: 'memory-safety',
    file: '/src/optimizer/DeadCodeElimination.cpp',
    line: 201,
    title: 'Unchecked dynamic cast result',
    description: 'Dynamic cast result not checked before use',
    codeSnippet: `void DeadCodeElimination::optimizeCall(Instruction* inst) {
    CallInst* call = dynamic_cast<CallInst*>(inst);
    Function* callee = call->getCalledFunction();  // Line 201: BUG - call might be null
}`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-const call Pointer)
(declare-const null Pointer)
(assert (= call null))
(check-sat)
; sat - proving dynamic_cast can return null`,
    simplifiedProof: `The dynamic_cast returns nullptr if the instruction is not actually a CallInst. The code doesn't check for null before calling methods on 'call', causing a null pointer dereference if the cast fails.`,
    explanation: `This is a null pointer dereference bug. If the instruction is not a CallInst, dynamic_cast returns nullptr, but the code immediately dereferences it without checking. This causes a segmentation fault and compiler crash on certain code patterns.`,
    suggestedFix: `void DeadCodeElimination::optimizeCall(Instruction* inst) {
    CallInst* call = dynamic_cast<CallInst*>(inst);
    if (call == nullptr) {
        return;  // Not a call instruction
    }
    Function* callee = call->getCalledFunction();
}`,
  },
]

const metaDataFlowAnalysisIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-26',
    severity: 'high',
    category: 'memory-safety',
    file: '/src/analysis/DataFlowAnalysis.cpp',
    line: 78,
    title: 'Off-by-one in bitmap allocation',
    description: 'Bitmap size calculation incorrect',
    codeSnippet: `uint64_t* DataFlowAnalysis::createBitmap(size_t numBits) {
    size_t numWords = numBits / 64;  // Line 78: BUG - Off-by-one
    return new uint64_t[numWords]();
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const numBits Int)
(declare-const numWords Int)
(assert (= numWords (div numBits 64)))
(assert (= (mod numBits 64) 1))
(assert (not (>= (* numWords 64) numBits)))
(check-sat)
; sat - proving allocated size is insufficient`,
    simplifiedProof: `When numBits is not a multiple of 64, integer division rounds down. For example, 65 bits needs 2 words, but 65/64 = 1, allocating only 1 word. Accessing bit 64 will overflow the allocated array.`,
    explanation: `This is an off-by-one error in bitmap allocation. The calculation numBits / 64 rounds down, so for any numBits that is not a multiple of 64, the allocated array is one element too small. Writing to the last few bits will overflow the array and corrupt memory.`,
    suggestedFix: `uint64_t* DataFlowAnalysis::createBitmap(size_t numBits) {
    size_t numWords = (numBits + 63) / 64;  // Round up
    return new uint64_t[numWords]();
}`,
  },
  {
    id: 'issue-27',
    severity: 'medium',
    category: 'undefined-behavior',
    file: '/src/analysis/DataFlowAnalysis.cpp',
    line: 134,
    title: 'Division by zero in convergence check',
    description: 'Denominator not validated before division',
    codeSnippet: `float DataFlowAnalysis::calculateConvergence(int current, int previous) {
    return (float)(current - previous) / previous;  // Line 134: BUG - previous might be 0
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const previous Int)
(declare-const current Int)
(assert (= previous 0))
(check-sat)
; sat - proving division by zero is possible`,
    simplifiedProof: `If the previous iteration had zero data flow changes, the previous parameter is 0, causing division by zero which is undefined behavior.`,
    explanation: `This is a division by zero bug. If the previous iteration had no changes, dividing by zero causes undefined behavior. In practice, this typically results in a floating-point exception and program crash, halting the compilation process.`,
    suggestedFix: `float DataFlowAnalysis::calculateConvergence(int current, int previous) {
    if (previous == 0) {
        return current == 0 ? 0.0f : 1.0f;
    }
    return (float)(current - previous) / previous;
}`,
  },
  {
    id: 'issue-28',
    severity: 'medium',
    category: 'type-safety',
    file: '/src/analysis/DataFlowAnalysis.cpp',
    line: 189,
    title: 'Enum out of range',
    description: 'Integer cast to enum without range validation',
    codeSnippet: `DataFlowState DataFlowAnalysis::intToState(int value) {
    return static_cast<DataFlowState>(value);  // Line 189: BUG - No validation
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const value Int)
(declare-const NUM_STATES Int)
(assert (= NUM_STATES 3))
(assert (or (< value 0) (>= value NUM_STATES)))
(check-sat)
; sat - proving out-of-range value is possible`,
    simplifiedProof: `If value is outside the valid range of the DataFlowState enum, casting it to the enum type creates an invalid enum value, causing undefined behavior when used in switch statements or enum operations.`,
    explanation: `This is an out-of-range enum cast bug. If the integer value doesn't correspond to a valid enum value, the resulting enum variable holds an invalid state. Using this in switch statements or enum comparisons causes undefined behavior and can lead to incorrect optimization decisions.`,
    suggestedFix: `DataFlowState DataFlowAnalysis::intToState(int value) {
    if (value < 0 || value >= NUM_DATA_FLOW_STATES) {
        throw std::out_of_range("Invalid data flow state");
    }
    return static_cast<DataFlowState>(value);
}`,
  },
  {
    id: 'issue-29',
    severity: 'low',
    category: 'memory-safety',
    file: '/src/analysis/DataFlowAnalysis.cpp',
    line: 245,
    title: 'Vector subscript out of bounds',
    description: 'Vector accessed without size checking',
    codeSnippet: `Value* DataFlowAnalysis::getInput(const Instruction* inst, size_t idx) {
    return inst->operands[idx];  // Line 245: BUG - idx not validated
}`,
    smtLibProof: `(set-logic QF_LIA)
(declare-const idx Int)
(declare-const size Int)
(assert (>= idx size))
(check-sat)
; sat - proving out-of-bounds access is possible`,
    simplifiedProof: `If idx is greater than or equal to the number of operands, accessing inst->operands[idx] reads beyond the vector bounds, causing undefined behavior.`,
    explanation: `This is a vector out-of-bounds access bug. If the index is greater than or equal to the vector size, accessing the element reads memory beyond the vector, causing undefined behavior. In debug builds this might throw an exception, but in optimized builds it accesses invalid memory.`,
    suggestedFix: `Value* DataFlowAnalysis::getInput(const Instruction* inst, size_t idx) {
    if (idx >= inst->operands.size()) {
        throw std::out_of_range("Operand index out of bounds");
    }
    return inst->operands[idx];
}`,
  },
]

const metaPassManagerHeaderIssuesRaw: Omit<Issue, "discoveredAt" | "lastUpdated" | "status">[] = [
  {
    id: 'issue-30',
    severity: 'medium',
    category: 'undefined-behavior',
    file: '/include/optimizer/PassManager.h',
    line: 67,
    title: 'Virtual destructor missing in base class',
    description: 'Base class with virtual functions lacks virtual destructor',
    codeSnippet: `class Pass {
public:
    virtual void run() = 0;
    virtual const char* getName() = 0;
    ~Pass() { }  // Line 67: BUG - Should be virtual
};`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Class 0)
(declare-fun isVirtual (Class) Bool)
(declare-const Pass Class)
(declare-const DerivedPass Class)
(assert (not (isVirtual Pass)))
(assert (isVirtual DerivedPass))
(check-sat)
; sat - proving undefined behavior when deleting through base pointer`,
    simplifiedProof: `If a derived class object is deleted through a Pass* pointer, only the Pass destructor runs, not the derived class destructor. This causes resource leaks and undefined behavior.`,
    explanation: `This is a missing virtual destructor bug. When a class has virtual functions, it's intended to be used polymorphically (via base class pointers). If the destructor is not virtual and a derived object is deleted through a base pointer, only the base destructor runs, leaking derived class resources and causing undefined behavior.`,
    suggestedFix: `class Pass {
public:
    virtual void run() = 0;
    virtual const char* getName() = 0;
    virtual ~Pass() { }  // Virtual destructor
};`,
  },
  {
    id: 'issue-31',
    severity: 'medium',
    category: 'type-safety',
    file: '/include/optimizer/PassManager.h',
    line: 123,
    title: 'Implicit conversion loses const qualifier',
    description: 'Const pointer implicitly converted to non-const',
    codeSnippet: `class PassManager {
    Pass* getPass(size_t idx) const {
        return passes[idx];  // Line 123: BUG - Returns non-const from const method
    }
    std::vector<Pass*> passes;
};`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Method 0)
(declare-fun isConst (Method) Bool)
(declare-fun returnsConst (Method) Bool)
(declare-const getPass Method)
(assert (isConst getPass))
(assert (not (returnsConst getPass)))
(check-sat)
; sat - proving const-correctness violation`,
    simplifiedProof: `A const method promises not to modify the object or allow modifications through returned references/pointers. Returning a non-const Pass* from a const method violates this promise, allowing modification of the PassManager's state.`,
    explanation: `This is a const-correctness violation. The getPass() method is marked const, promising not to modify the PassManager, but it returns a non-const Pass* that allows callers to modify the passes vector contents. This breaks const-correctness guarantees and can lead to unexpected modifications in code that assumes const methods don't allow changes.`,
    suggestedFix: `class PassManager {
    const Pass* getPass(size_t idx) const {
        return passes[idx];  // Return const pointer
    }
    Pass* getPass(size_t idx) {
        return passes[idx];  // Non-const overload
    }
    std::vector<Pass*> passes;
};`,
  },
  {
    id: 'issue-32',
    severity: 'low',
    category: 'memory-safety',
    file: '/include/optimizer/PassManager.h',
    line: 178,
    title: 'Raw pointer ownership unclear',
    description: 'Unclear who owns the Pass* pointers',
    codeSnippet: `class PassManager {
public:
    void addPass(Pass* pass) {  // Line 178: BUG - Ownership unclear
        passes.push_back(pass);
    }
private:
    std::vector<Pass*> passes;
};`,
    smtLibProof: `(set-logic QF_UF)
(declare-sort Pointer 0)
(declare-fun owned (Pointer) Bool)
(declare-const pass Pointer)
(assert (not (owned pass)))
(check-sat)
; sat - proving ownership is ambiguous`,
    simplifiedProof: `It's unclear whether PassManager takes ownership of the Pass* pointer or just holds a reference. If PassManager doesn't delete the passes, it leaks memory. If it does delete them but the caller also deletes, it's a double-free.`,
    explanation: `This is an ownership ambiguity issue. Using raw pointers doesn't make ownership clear - it's uncertain whether PassManager should delete the Pass objects or if the caller retains ownership. This commonly leads to either memory leaks (if nobody deletes) or double-frees (if both delete). Modern C++ should use smart pointers to make ownership explicit.`,
    suggestedFix: `class PassManager {
public:
    void addPass(std::unique_ptr<Pass> pass) {  // Clear ownership transfer
        passes.push_back(std::move(pass));
    }
private:
    std::vector<std::unique_ptr<Pass>> passes;
};`,
  },
]

// Apply metadata to all issues (wrap with metadata)
export const stripePaymentProcessorIssues: Issue[] = stripePaymentProcessorIssuesRaw.map((issue, idx) =>
  addMetadata(issue, idx)
)
export const stripeTransactionManagerIssues: Issue[] = stripeTransactionManagerIssuesRaw.map((issue, idx) =>
  addMetadata(issue, idx + 1)
)
export const stripeCryptoIssues: Issue[] = stripeCryptoIssuesRaw.map((issue, idx) => addMetadata(issue, idx + 2))
export const metaPassManagerIssues: Issue[] = metaPassManagerIssuesRaw.map((issue, idx) => addMetadata(issue, idx))
export const metaDeadCodeEliminationIssues: Issue[] = metaDeadCodeEliminationIssuesRaw.map((issue, idx) =>
  addMetadata(issue, idx + 1)
)
export const metaDataFlowAnalysisIssues: Issue[] = metaDataFlowAnalysisIssuesRaw.map((issue, idx) =>
  addMetadata(issue, idx + 2)
)
export const metaPassManagerHeaderIssues: Issue[] = metaPassManagerHeaderIssuesRaw.map((issue, idx) =>
  addMetadata(issue, idx + 3)
)

// Combine all issues
export const allIssues: Issue[] = [
  ...stripePaymentProcessorIssues,
  ...stripeTransactionManagerIssues,
  ...stripeCryptoIssues,
  ...metaPassManagerIssues,
  ...metaDeadCodeEliminationIssues,
  ...metaDataFlowAnalysisIssues,
  ...metaPassManagerHeaderIssues,
]

// Map issues by ID for quick lookup
export const issueMap = new Map<string, Issue>(allIssues.map(issue => [issue.id, issue]))
