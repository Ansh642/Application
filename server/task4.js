
const { policyholders, policies, claims } = require('./data');

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    return phone.length === 10 && !isNaN(phone);
}


function createPolicyholder(policyholder) {
    const existing = policyholders.find(ph => ph.id === policyholder.id);
    if (existing) {
        return "Error: Policyholder ID already exists.";
    }
    if (!validateEmail(policyholder.email)) {
        return "Error: Invalid email format.";
    }
    if (!validatePhone(policyholder.phone)) {
        return "Error: Invalid phone number.";
    }
    policyholders.push(policyholder);
    return "Policyholder created successfully.";
}


function createPolicy(policy) {
    const policyholderExists = policyholders.some(ph => ph.id === policy.policyholderId);
    if (!policyholderExists) {
        return "Error: Invalid policyholder ID.";
    }
    if (policy.coverageAmount <= 0) {
        return "Error: Coverage amount must be positive.";
    }
    policies.push(policy);
    return "Policy created successfully.";
}


function createClaim(claim) {
    const policy = policies.find(p => p.id === claim.policyId);
    if (!policy) {
        return "Error: Policy not found.";
    }
    if (claim.claimAmount > policy.coverageAmount) {
        return "Error: Claim exceeds policy coverage.";
    }
    if (claim.claimAmount <= 0) {
        return "Error: Claim amount must be positive.";
    }
    claims.push(claim);
    return "Claim created successfully.";
}

// Testing 
console.log(createPolicyholder({ id: "PH002", name: "Alice", email: "alice@example.com", phone: "9876543210" }));
console.log(createPolicy({ id: "P002", policyholderId: "PH002", policyNumber: "POL654321", coverageAmount: 20000, startDate: "2023-05-01", endDate: "2026-05-01" }));
console.log(createClaim({ id: "C002", policyId: "P002", claimAmount: 5000, claimDate: "2024-06-01", status: "Pending" }));

module.exports = { createPolicyholder, createPolicy, createClaim };
