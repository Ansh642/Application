
const { policyholders } = require('./data');

// CRUD Functions for Policyholders
function createPolicyholder(policyholder) {
    const existing = policyholders.find(ph => ph.id === policyholder.id);
    if (existing) {
        return "Error: Policyholder ID already exists.";
    }
    policyholders.push(policyholder);
    return "Policyholder created successfully.";
}

function viewPolicyholder(id) {
    const policyholder = policyholders.find(ph => ph.id === id);
    return policyholder || "Error: Policyholder not found.";
}

function updatePolicyholder(id, updatedData) {
    const index = policyholders.findIndex(ph => ph.id === id);
    if (index === -1) {
        return "Error: Policyholder not found.";
    }
    policyholders[index] = { ...policyholders[index], ...updatedData };
    return "Policyholder updated successfully.";
}

function deletePolicyholder(id) {
    const index = policyholders.findIndex(ph => ph.id === id);
    if (index === -1) {
        return "Error: Policyholder not found.";
    }
    policyholders.splice(index, 1);
    return "Policyholder deleted successfully.";
}

// Testing 
console.log(createPolicyholder({ id: "PH002", name: "Alice", email: "alice@example.com", phone: "9876543210" }));
console.log(viewPolicyholder("PH002"));
console.log(updatePolicyholder("PH002", { name: "Alice Cooper" }));
console.log(deletePolicyholder("PH002"));
console.log(viewPolicyholder("PH002")); 

module.exports = { createPolicyholder, viewPolicyholder, updatePolicyholder, deletePolicyholder };
