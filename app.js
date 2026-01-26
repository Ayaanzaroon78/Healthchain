// 1. Configuration
// REPLACE THIS ADDRESS AFTER DEPLOYING THE SOLIDITY CONTRACT
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"; 

// The ABI explains to JS how to talk to the Solidity Contract
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{ "indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256" },
			{ "indexed": true, "internalType": "address", "name": "sharedWith", "type": "address" }
		],
		"name": "AccessGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{ "indexed": true, "internalType": "uint256", "name": "recordId", "type": "uint256" },
			{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
			{ "indexed": false, "internalType": "string", "name": "fileName", "type": "string" }
		],
		"name": "DataUploaded",
		"type": "event"
	},
	{
		"inputs": [
			{ "internalType": "uint256", "name": "_recordId", "type": "uint256" }
		],
		"name": "getDataHash",
		"outputs": [
			{ "internalType": "string", "name": "", "type": "string" },
			{ "internalType": "string", "name": "", "type": "string" },
			{ "internalType": "address", "name": "", "type": "address" }
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{ "internalType": "uint256", "name": "_recordId", "type": "uint256" },
			{ "internalType": "address", "name": "_userToGrant", "type": "address" }
		],
		"name": "grantAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{ "internalType": "string", "name": "_ipfsHash", "type": "string" },
			{ "internalType": "string", "name": "_fileName", "type": "string" }
		],
		"name": "uploadHealthData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// 2. Global Variables
let provider;
let signer;
let contract;

// 3. Connect to Wallet (MetaMask)
document.getElementById('connectWalletBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Setup Provider and Signer (Ethers.js)
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Initialize Contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            // Update UI
            const address = await signer.getAddress();
            document.getElementById('userAddress').innerText = "Connected: " + address;
            document.getElementById('appInterface').style.display = "block";
            document.getElementById('connectWalletBtn').style.display = "none";
            
        } catch (error) {
            console.error(error);
            alert("Connection Failed!");
        }
    } else {
        alert("Please install MetaMask!");
    }
});

// 4. Upload Data
async function uploadData() {
    const name = document.getElementById('fileName').value;
    const dataHash = document.getElementById('fileData').value; // In a real app, this comes from IPFS upload

    if(!name || !dataHash) return alert("Please fill details");

    try {
        const tx = await contract.uploadHealthData(dataHash, name);
        document.getElementById('dataDisplay').innerText = "Transaction Sent! Waiting for confirmation...";
        await tx.wait();
        document.getElementById('dataDisplay').innerText = "Success! Data Uploaded.";
    } catch (err) {
        console.error(err);
        alert("Upload Failed (Check Console)");
    }
}

// 5. Grant Access
async function grantAccess() {
    const id = document.getElementById('shareRecordId').value;
    const address = document.getElementById('shareAddress').value;

    try {
        const tx = await contract.grantAccess(id, address);
        document.getElementById('dataDisplay').innerText = "Authorizing user...";
        await tx.wait();
        document.getElementById('dataDisplay').innerText = `Success! User ${address} can now view record ${id}`;
    } catch (err) {
        console.error(err);
        alert("Authorization Failed. Are you the owner?");
    }
}

// 6. View Data (Checks permissions)
async function viewData() {
    const id = document.getElementById('viewRecordId').value;

    try {
        const data = await contract.getDataHash(id);
        // data[0] is IPFS Hash, data[1] is FileName, data[2] is Owner
        document.getElementById('dataDisplay').innerHTML = `
            <strong>File Name:</strong> ${data[1]} <br>
            <strong>IPFS Hash:</strong> ${data[0]} <br>
            <strong>Owner:</strong> ${data[2]} <br>
            <span style="color: lightgreen">✅ Access Verified by Blockchain</span>
        `;
    } catch (err) {
        console.error(err);
        document.getElementById('dataDisplay').innerHTML = `
            <span style="color: red">❌ Access Denied!</span> <br> 
            You do not have permission to view this record.
        `;
    }
}