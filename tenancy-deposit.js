$(document).ready(function () {

    const tenancyContractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_contractAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "BalanceChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_contractAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "MoneyWithdrawn",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "signContract",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_contractAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "statusIndex",
                    "type": "uint256"
                }
            ],
            "name": "StatusChanged",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tenant",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_expectedDeposit",
                    "type": "uint256"
                }
            ],
            "name": "tenancyDeposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "terminateContract",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawTenantDeposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractStatus",
            "outputs": [
                {
                    "internalType": "enum TenancyDeposit.ContractStatus",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getExpectedDeposit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLandlordBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPaidDeposit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTenantBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const tenancyContractData = '0x608060405260008060006101000a81548160ff0219169083600481111561002257fe5b021790555034801561003357600080fd5b50610c9a806100436000396000f3fe6080604052600436106100915760003560e01c8063b8b4f1a011610059578063b8b4f1a01461017c578063c032846b14610186578063c1d80a52146101bf578063eac06206146101c9578063feeaea4e146101f457610091565b80632fd949ca1461009657806364838c63146100a05780636f9fb98a146100fb5780638be23155146101265780638d6b621d14610151575b600080fd5b61009e61021f565b005b3480156100ac57600080fd5b506100f9600480360360408110156100c357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103bf565b005b34801561010757600080fd5b50610110610662565b6040518082815260200191505060405180910390f35b34801561013257600080fd5b5061013b6106a2565b6040518082815260200191505060405180910390f35b34801561015d57600080fd5b506101666106ac565b6040518082815260200191505060405180910390f35b610184610725565b005b34801561019257600080fd5b5061019b610943565b604051808260048111156101ab57fe5b60ff16815260200191505060405180910390f35b6101c7610959565b005b3480156101d557600080fd5b506101de610be1565b6040518082815260200191505060405180910390f35b34801561020057600080fd5b50610209610beb565b6040518082815260200191505060405180910390f35b600280600481111561022d57fe5b6000809054906101000a900460ff16600481111561024757fe5b1461025157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614806102fa57503373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b61030357600080fd5b60036000806101000a81548160ff0219169083600481111561032157fe5b02179055506000809054906101000a900460ff16600481111561034057fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a450565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156103f857600080fd5b6000811161040557600080fd5b6000600481111561041257fe5b6000809054906101000a900460ff16600481111561042c57fe5b1461043657600080fd5b30600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900460ff16600481111561049157fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a433600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060038190555060006004819055504260058190555060016000806101000a81548160ff021916908360048111156105c357fe5b02179055506000809054906101000a900460ff1660048111156105e257fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a45050565b60008060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631905090565b6000600354905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461070857600080fd5b3373ffffffffffffffffffffffffffffffffffffffff1631905090565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461077f57600080fd5b600180600481111561078d57fe5b6000809054906101000a900460ff1660048111156107a757fe5b146107b157600080fd5b3460035411156107c057600080fd5b3460048190555060026000806101000a81548160ff021916908360048111156107e557fe5b02179055506000809054906101000a900460ff16600481111561080457fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b60008060009054906101000a900460ff16905090565b3373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109b357600080fd5b600060045490503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610a00573d6000803e3d6000fd5b506000809054906101000a900460ff166004811115610a1b57fe5b3373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f6b09150b12f595e5171ac7600c65498802bf21649934f6cd7ef5c422c47afdf560405160405180910390a43373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4f136790ca2b02dd39dcea56388647afc7c6438fca8c8ec4baf95ea20c0770a0836040518082815260200191505060405180910390a33373ffffffffffffffffffffffffffffffffffffffff16600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7a350141a4375888264971fc98bdf535c1843ad8a215baaede8397fb56404ab3600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a350565b6000600454905090565b60003373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c4757600080fd5b3373ffffffffffffffffffffffffffffffffffffffff163190509056fea2646970667358221220071c7fa062d171d6324f979fc84bc8845f21aecc971c4a0e6348aecabb1754e764736f6c63430006080033';
    const tenancyContractGas = 4700000;

    const KEY_LANDLORD_ADDRESS = 'landlordAddress';
    const KEY_TENANT_ADDRESS = 'tenantAddress';
    // const KEY_ARBITER_ADDRESS = 'arbiterAddress';
    const KEY_DEPOSIT = 'deposit';
    //const KEY_DEDUCTION = 'deduction';
    const KEY_BALANCE = 'balance';
    const KEY_STATUS = 'status';
    const KEY_IS_ROPSTEN = 'isRopstenTestNet';
    const KEY_CONTRACT_ADDRESS = 'tenancyDepositContractAddress';
   // const KEY_LANDLORD_DEDUCTION_CLAIM = 'landlordDeductionClaim';
   // const KEY_TENANT_DEDUCTION_CLAIM = 'tenantDeductionClaim';

    let statusChangedEvent;
    //let deductionClaimedEvent;
   // let deductionAgreedEvent;
   // let disputeResolvedEvent;
    let balanceChangedEvent;
    //let moneyWithdrawnEvent;

    resetTenancyDepositContractData();

    // --- Solidity Contract Call Functions ---

    function createTenancyDepositContractData() {
        console.log("setup Tenancy Deposit Contract Details...");
        if (typeof(Storage) !== "undefined") {

            let landlordAddress = $('#contract-landlordAddress').val();
            let tenantAddress = $('#contract-tenantAddress').val();
            //let arbiterAddress = $('#contract-arbiterAddress').val();
            let deposit = $('#contract-deposit').val();
            let isRopstenTestNet = $('#contract-ropstenTestNet').is(':checked');

            // validate input
            // validateActorAddress(landlordAddress, "landlord");
            // validateActorAddress(tenantAddress, "tenant");
            // validateActorAddress(arbiterAddress, "arbiter");

            createContract(isRopstenTestNet, landlordAddress, tenantAddress, deposit, defaultCallbackHandler);

        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function validateActorAddress(address, actorType) {
        if ((typeof address === 'undefined') || ! (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address))) {
            return showError("Please provide valid " + actorType + " address.");
        }
    }

    function createContract(isRopstenTestNet, landlordAddress, tenantAddress, expectedDeposit) {
        console.log("createContract...");
        if (typeof(Storage) !== "undefined") {

            if (isRopstenTestNet) {
                if (typeof web3 === 'undefined') {
                    return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
                }
            } else {
                web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            }

            let TenancyDepositContract = web3.eth.contract(tenancyContractABI);
            let tenancyDepositContractInstance = TenancyDepositContract.new(
                tenantAddress,
                //arbiterAddress,
                expectedDeposit,
                {
                    from: landlordAddress,
                    data: tenancyContractData,
                    gas: tenancyContractGas
                }, function (error, contract){
                    if(error) {
                        console.error(error, contract);
                    } else if (typeof contract.address !== 'undefined') {
                        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);

                        // persist contract data to local storage
                        localStorage.setItem(KEY_LANDLORD_ADDRESS, landlordAddress);
                        localStorage.setItem(KEY_TENANT_ADDRESS, tenantAddress);
                        //localStorage.setItem(KEY_ARBITER_ADDRESS, arbiterAddress);
                        localStorage.setItem(KEY_DEPOSIT, ""+expectedDeposit);
                        localStorage.setItem(KEY_IS_ROPSTEN, isRopstenTestNet);
                        localStorage.setItem(KEY_CONTRACT_ADDRESS, contract.address);

                        // register event listeners
                        statusChangedEvent = contract.StatusChanged({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        statusChangedEvent.watch(handleStatusChanged);

                        balanceChangedEvent = contract.BalanceChanged({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        balanceChangedEvent.watch(handleBalanceChanged);

                        //deductionAgreedEvent = contract.DeductionAgreed({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        //deductionAgreedEvent.watch(handleDeductionAgreed);

                       // disputeResolvedEvent = contract.DisputeResolved({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        //disputeResolvedEvent.watch(handleDisputeResolved);

                        //deductionClaimedEvent = contract.DeductionClaimed({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        //deductionClaimedEvent.watch(handleDeductionClaimed);

                        //moneyWithdrawnEvent = contract.MoneyWithdrawn({_contractAddress:contract.address},{fromBlock: 0, toBlock: 'latest'});
                        //moneyWithdrawnEvent.watch(handleMoneyWithdrawn);
                    }
                });
        }
    }

    function tenantSignContract() {
        console.log('tenant signs contract...');

        configureWeb3Provider();

        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let tenantAddress = localStorage.getItem(KEY_TENANT_ADDRESS);
        let deposit = localStorage.getItem(KEY_DEPOSIT);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.signContract({from: tenantAddress, value: deposit}, defaultCallbackHandler);
    }

    function landlordTerminateContract() {
        terminateContract(KEY_LANDLORD_ADDRESS);
    }

    function tenantTerminateContract() {
        terminateContract(KEY_TENANT_ADDRESS);
    }

    function terminateContract(senderAddressKey) {
        console.log('terminating contract...');

        configureWeb3Provider();

        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(senderAddressKey);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.terminateContract({from: senderAddress}, defaultCallbackHandler);
    }

    /*function landlordClaimDeduction() {
        console.log('landlord claiming deduction...');

        configureWeb3Provider();

        let landlordDeductionClaim = $('#landlord-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_LANDLORD_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.landlordClaimDeduction(landlordDeductionClaim, {from: senderAddress}, defaultCallbackHandler);
    }

    function tenantClaimDeduction() {
        console.log('tenant claiming deduction...');

        configureWeb3Provider();

        let tenantDeductionClaim = $('#tenant-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_TENANT_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.tenantClaimDeduction(tenantDeductionClaim, {from: senderAddress}, defaultCallbackHandler);
    }

    function arbiterResolvesDispute() {
        console.log('arbiter resolves dispute...');

        configureWeb3Provider();

        let deductionValue = $('#arbiter-deduction').val();
        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_ARBITER_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.resolveDispute(deductionValue, {from: senderAddress}, defaultCallbackHandler);
    }

    function withdrawTenantDeposit() {
        console.log('tenant withdraws deposit...');

        configureWeb3Provider();

        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_TENANT_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.withdrawTenantDeposit({from: senderAddress}, defaultCallbackHandler);
    }

    function withdrawLandlordClaim() {
        console.log('landlord withdraws deduction...');

        configureWeb3Provider();

        let tenancyContractAddress = localStorage.getItem(KEY_CONTRACT_ADDRESS);
        let senderAddress = localStorage.getItem(KEY_LANDLORD_ADDRESS);

        let contract = web3.eth.contract(tenancyContractABI).at(tenancyContractAddress);

        contract.withdrawLandlordClaim({from: senderAddress}, defaultCallbackHandler);
    }*/

    // --- Solidity Event Handlers ---

    // TODO move this logic (state machine?) out in a separate module/file/package
    function handleStatusChanged(error, statusChangedEvent){
        if (error) {
            console.error("Problem handling StatusChanged event: " + error);
        } else {
            let oldContractStatusIndex = parseInt(""+localStorage.getItem(KEY_STATUS));
            let newStatusIndex = statusChangedEvent.args.statusIndex.c[0];
            let senderAddress = statusChangedEvent.args._from;

            // TODO validate values

            let newContractStatus = getStatus(newStatusIndex);
            let oldContractStatus = getStatus(oldContractStatusIndex);

            let logMsg = "changing status: "+ oldContractStatusIndex + " -> " + newStatusIndex;
            let errMsg = "Invalid new contract status '" + newContractStatus
                + "' when old one is '" + oldContractStatus + "'";

            switch(oldContractStatusIndex) {
                case -1: // N/A
                    switch (newStatusIndex) {
                        case 0: // Booting Up: N/A -> Not Signed
                        {
                            updateStatus(newStatusIndex, logMsg);
                        }
                        default:
                            ignoreStatusChange(errMsg);
                        break;
                    }
                case 0: // Not Signed
                    switch (newStatusIndex) {
                        case 1: // Contract Created: Not Signed -> Deposit Required
                        {
                            updateStatus(newStatusIndex, logMsg);

                            // update UI:
                            updateView(KEY_LANDLORD_ADDRESS, localStorage.getItem(KEY_LANDLORD_ADDRESS));
                            updateView(KEY_TENANT_ADDRESS, localStorage.getItem(KEY_TENANT_ADDRESS));
                            //updateView(KEY_ARBITER_ADDRESS, localStorage.getItem(KEY_ARBITER_ADDRESS));
                            updateView(KEY_DEPOSIT, localStorage.getItem(KEY_DEPOSIT));

                            disableElement('contract-landlordAddress');
                            disableElement('contract-tenantAddress');
                           // disableElement('contract-arbiterAddress');
                            disableElement('contract-deposit');
                           // disableElement('contract-deduction');
                            disableElement('contract-ropstenTestNet');
                            disableElement('documentCreateTenancyDepositContract');

                            enableElement('documentResetTenancyDepositContract');
                            enableElement('documentTenantSignContract');
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                    break;
                case 1: // Deposit Required
                    switch(newStatusIndex)
                    {
                        case 2: // Tenants Signs Contract: Deposit Required -> Active
                        {
                            updateStatus(newStatusIndex, logMsg);

                            // update UI:

                            // landlord ui controls
                            enableElement('documentLandlordTerminateContract');

                            // tenant ui controls
                            disableElement('documentTenantSignContract');
                            enableElement('documentTenantTerminateContract');
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 2: // Active
                    switch(newStatusIndex)
                    {
                        case 3: // Contract Comes to an End: Active -> Complete
                        {
                            updateStatus(newStatusIndex, logMsg);

                            // update UI:

                            // landlord ui controls
                           // enableElement('landlord-deduction');
                            disableElement('documentLandlordTerminateContract');
                           // enableElement('documentLandlordClaimDeduction');

                            // tenant ui controls
                            //enableElement('tenant-deduction');
                            disableElement('documentTenantTerminateContract');
                           // enableElement('documentTenantClaimDeduction');
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 3: // Complete
                    switch(newStatusIndex)
                    {
                        case 4: // Landlord or Tenant Claimed Deduction: Complete -> Deduction Claiming
                        {
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex, logMsg);
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
               /* case 4: // Deduction Claiming
                    switch(newStatusIndex)
                    {
                        case 4: // The Second Party Claimed Deduction: Deduction Claiming -> Deduction Claiming
                        {
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex, logMsg);
                            break;
                        }
                        case 5: // Both Parties Agreed on Deduction Value: Deduction Claiming -> Deduction Agreed
                        {
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex, logMsg);

                            // landlord ui controls
                            enableElement('documentLandlordWithdrawDeduction');

                            // tenant ui controls
                            enableElement('documentTenantWithdrawDeposit');

                            break;
                        }
                        case 6: // The Parties Disagreed on Deduction Value: Deduction Claiming -> Dispute
                        {
                            handleDeductionClaimingStatusChange(senderAddress, newStatusIndex, logMsg);

                            // arbiter ui controls
                            enableElement('arbiter-deduction');
                            enableElement('documentArbiterResolveDispute');

                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 5: // Deduction Agreed
                    switch(newStatusIndex)
                    {
                        case 8: // Tenant or Landlord Withdraws Money: Deduction Agreed -> Money Withdrawal
                        {
                            updateStatus(newStatusIndex, logMsg);
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 6: // Dispute
                    switch(newStatusIndex)
                    {
                        case 7: // Arbiter Resolves Dispute: Dispute -> Dispute Resolved
                        {
                            updateStatus(newStatusIndex, logMsg);

                            // update UI:

                            // landlord ui controls
                            enableElement('documentLandlordWithdrawDeduction');

                            // tenant ui controls
                            enableElement('documentTenantWithdrawDeposit');

                            // arbiter ui controls
                            disableElement('arbiter-deduction');
                            disableElement('documentArbiterResolveDispute');

                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 7: // Dispute Resolved
                    switch(newStatusIndex)
                    {
                        case 8: // Tenant or Landlord Withdraws Money: DisputeResolved -> Money Withdrawal
                        {
                            updateStatus(newStatusIndex, logMsg);
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }
                case 8: // Money Withdrawal
                    switch(newStatusIndex)
                    {
                        case 9: // The Second Party Withdraws Money: Money Withdrawal -> Done
                        {
                            updateStatus(newStatusIndex, logMsg);
                            break;
                        }
                        default:
                            ignoreStatusChange(errMsg);
                    }*/
                default:
                    ignoreStatusChange(errMsg);
            }
        }
    }

   /* function handleDeductionClaimingStatusChange(senderAddress, newStatusIndex, logMsg) {
        updateStatus(newStatusIndex, logMsg);

        // update UI:

        // landlord ui controls
        if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_LANDLORD_ADDRESS).toLowerCase())) {
            disableElement('landlord-deduction');
            disableElement('documentLandlordClaimDeduction');
        }
        // tenant ui controls
        else if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_TENANT_ADDRESS).toLowerCase())) {
            disableElement('tenant-deduction');
            disableElement('documentTenantClaimDeduction');
        }
    }*/

    function handleBalanceChanged(error, balanceChangedEvent){
        if (error) {
            console.error("Problem handling BalanceChanged event: " + error);
        } else {
            let localBalanceValue = localStorage.getItem(KEY_BALANCE);
            let newBalanceValue = balanceChangedEvent.args.value.c[0];
            // TODO validate new balance value

            if (localBalanceValue != newBalanceValue) {
                console.log('balance changed to: ' + newBalanceValue);

                // update model
                localStorage.setItem(KEY_BALANCE, newBalanceValue);

                // update UI
                updateView(KEY_BALANCE, newBalanceValue);
            } else {
                console.log("Ignoring follow-up balancedChangedEvent.");
            }
        }
    }

    /*function handleDeductionAgreed(error, deductionAgreedEvent) {
        if (error) {
            console.error("Problem handling DeductionAgreed event: " + error);
        } else {
            let deductionValue = deductionAgreedEvent.args.deduction.c[0];

            localStorage.setItem(KEY_DEDUCTION, deductionValue);
            updateView(KEY_DEDUCTION, deductionValue);
        }
    }

    function handleDisputeResolved(error, disputeResolvedEvent) {
        if (error) {
            console.error("Problem handling DisputeResolved event: " + error);
        } else {
            let deductionValue = disputeResolvedEvent.args.deduction.c[0];

            localStorage.setItem(KEY_DEDUCTION, deductionValue);
            updateView(KEY_DEDUCTION, deductionValue);
        }
    }

    function handleDeductionClaimed(error, deductionClaimedEvent){
        if (error) {
            console.error("Problem handling DeductionClaimed event: " + error);
        } else {
            let senderAddress = deductionClaimedEvent.args._from;
            let deductionClaimValue = deductionClaimedEvent.args.claim.c[0];

            // TODO validate new values

            if (senderAddress.toLowerCase() === localStorage.getItem(KEY_LANDLORD_ADDRESS).toLowerCase()) {
                localStorage.setItem(KEY_LANDLORD_DEDUCTION_CLAIM, deductionClaimValue);
                disableElement('landlord-deduction');
                disableElement('documentLandlordClaimDeduction');
            }
            else if (senderAddress.toLowerCase() === localStorage.getItem(KEY_TENANT_ADDRESS).toLowerCase()) {
                disableElement('tenant-deduction');
                disableElement('documentTenantClaimDeduction');
                localStorage.setItem(KEY_TENANT_DEDUCTION_CLAIM, deductionClaimValue);
            }
        }
    }

    function handleMoneyWithdrawn(error, moneyWithdrawnEvent) {
        if (error) {
            console.error("Problem handling DeductionClaimed event: " + error);
        } else {
            let senderAddress = moneyWithdrawnEvent.args._from;

            // landlord ui controls
            if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_LANDLORD_ADDRESS).toLowerCase())) {
                disableElement('documentLandlordWithdrawDeduction');
            }
            // tenant ui controls
            else if (senderAddress.toLowerCase() === (localStorage.getItem(KEY_TENANT_ADDRESS).toLowerCase())) {
                disableElement('documentTenantWithdrawDeposit');
            }
        }
    }*/

    // --- Header Links Handlers ---

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkContractDetails').click(function () {
        showView("viewContractDetails");
    });

    $('#linkContractAdd').click(function () {
        showView("viewContractAdd");
    });

    $('#linkLandlord').click(function () {
        showView("viewLandlord")
    });

    $('#linkTenant').click(function () {
        showView("viewTenant")
    });

   /* $('#linkArbiter').click(function () {
        showView("viewArbiter")
    });*/

    // --- Button Handlers ---

    $('#documentCreateTenancyDepositContract').click(createTenancyDepositContractData);

    $('#documentTenantSignContract').click(tenantSignContract);

    $('#documentLandlordTerminateContract').click(landlordTerminateContract);

    $('#documentTenantTerminateContract').click(tenantTerminateContract);

   // $('#documentLandlordClaimDeduction').click(landlordClaimDeduction);

    //$('#documentTenantClaimDeduction').click(tenantClaimDeduction);

    //$('#documentArbiterResolveDispute').click(arbiterResolvesDispute);

    //$('#documentLandlordWithdrawDeduction').click(withdrawLandlordClaim);

   // $('#documentTenantWithdrawDeposit').click(withdrawTenantDeposit);

    $('#documentResetTenancyDepositContract').click(resetTenancyDepositContractData);

    // --- Helper Functions ---

    function configureWeb3Provider() {
        if (isRopstenTestNet) {
            if (typeof web3 === 'undefined') {
                return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser");
            }
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
    }

    function getStatus(statusIndex) {
        const ContractStatus = [
            "Not Signed",
            "Deposit Required",
            "Active" ,
            "Complete",
            //"Deduction Claiming" ,
            //"Deduction Agreed",
            //"Dispute",
           // "Dispute Resolved",
           // "Money Withdrawal",
            "Done"
        ];
        if (statusIndex < 0 || statusIndex >= ContractStatus.length) {
            return "N/A";
        }
        return ContractStatus[statusIndex];
    }

    function defaultCallbackHandler(error, result) {
        if(error) {
            console.error(error);
        } else {
            // console.log(result);
        }
    }

    function ignoreStatusChange(errMsg) {
        // console.log(errMsg);
    }

    function updateStatus(newStatusIndex, logMsg) {
        console.log(logMsg);

        // update model:
        localStorage.setItem(KEY_STATUS, newStatusIndex);

        // update UI:
        updateView(KEY_STATUS, getStatus(newStatusIndex));

    }

    function resetTenancyDepositContractData() {
        console.log("cleanup...");

        (function resetView() {
            updateView(KEY_LANDLORD_ADDRESS, "");
            updateView(KEY_TENANT_ADDRESS, "");
           // updateView(KEY_ARBITER_ADDRESS, "");
            updateView(KEY_DEPOSIT, "");
            //updateView(KEY_DEDUCTION, "");
            updateView(KEY_BALANCE, "");
            updateView(KEY_STATUS, "N/A");
            $('#contract-ropstenTestNet').prop('checked', false);

            // reset tenancy deposit agreement controls
            enableElement('contract-landlordAddress');
            enableElement('contract-tenantAddress');
           // enableElement('contract-arbiterAddress');
            enableElement('contract-deposit');
            enableElement('contract-ropstenTestNet');
            enableElement('documentCreateTenancyDepositContract');
            enableElement('documentResetTenancyDepositContract');

            // disable landlord ui controls
            disableElement('documentLandlordTerminateContract');
            //disableElement('documentLandlordClaimDeduction');
            //disableElement('documentLandlordWithdrawDeduction');

            // disable tenant ui controls
            disableElement('documentTenantSignContract');
            disableElement('documentTenantTerminateContract');
          //  disableElement('documentTenantClaimDeduction');
           // disableElement('documentTenantWithdrawDeposit');

            // disable arbiter ui controls
           // disableElement('documentArbiterResolveDispute');
        })();

        // reset local storage
        if (typeof(Storage) !== "undefined") {
            localStorage.clear();
            localStorage.setItem(KEY_STATUS, -1);
        } else {
            // TODO make it visible
            console.error("no local storage support...");
        }
    }

    function isRopstenTestNet() {
        return JSON.parse(localStorage.getItem(KEY_IS_ROPSTEN)) === true;
    }

    function updateView(key, value) {
        $('#' + key).val(value);
        $('#contract-' + key).val(value);
        $('#landlord-' + key).val(value);
        $('#tenant-' + key).val(value);
       // $('#arbiter-' + key).val(value);
    }

    function enableElement(key) {
        $('#'+key).prop("disabled", false);
    }

    function disableElement(key) {
        $('#'+key).prop("disabled", true);
    }

// Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }
});
