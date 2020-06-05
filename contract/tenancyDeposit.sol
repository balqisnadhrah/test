pragma solidity ^0.6.0;

contract TenancyDeposit {

    enum ContractStatus {UNSIGNED, DEPOSIT_REQUIRED, ACTIVE, COMPLETE}

    event StatusChanged (address indexed _contractAddress, address indexed _from, uint indexed statusIndex);
    event MoneyWithdrawn  (address indexed _contractAddress, address indexed _from, uint amount);
    event BalanceChanged (address indexed _contractAddress, address indexed _from, uint value);

    ContractStatus status = ContractStatus.UNSIGNED;

    uint constant MAX_VALUE = ~uint256(0);

    modifier landlordOnly() {
        require(landlord == msg.sender);
        _;
    }

    modifier tenantOnly() {
        require(tenant == msg.sender);
        _;
    }


    modifier withContractStatus(ContractStatus _status) {
        require(status == _status);
        _;
    }

    address contractAddress;
    address landlord;
    address tenant;
    uint expectedDeposit;
    uint paidDeposit;
    uint creationDate;

    function tenancyDeposit(address _tenant, uint _expectedDeposit) public
    {
        require(_tenant != msg.sender);
        require(_expectedDeposit > 0 ether);
        require(status == ContractStatus.UNSIGNED);

        contractAddress = address(this);

        emit StatusChanged(contractAddress, msg.sender, uint(status));

        landlord = msg.sender;

        tenant = _tenant;

        expectedDeposit = _expectedDeposit;
        paidDeposit = 0 ether;

        creationDate = block.timestamp;

        status = ContractStatus.DEPOSIT_REQUIRED;

        StatusChanged(contractAddress, msg.sender, uint(status));
    }

    function signContract() public payable
    tenantOnly
    withContractStatus(ContractStatus.DEPOSIT_REQUIRED)
    {
        require(expectedDeposit <= msg.value);
        paidDeposit = msg.value;
        status = ContractStatus.ACTIVE;

        emit StatusChanged(contractAddress, msg.sender, uint(status));
        BalanceChanged(contractAddress, msg.sender, contractAddress.balance);
    }

    function terminateContract() public payable withContractStatus(ContractStatus.ACTIVE) {
        require(tenant == msg.sender || landlord == msg.sender);
        status = ContractStatus.COMPLETE;

        StatusChanged(contractAddress, msg.sender, uint(status));
    }

   
   /* function withdrawTenantDeposit() public payable tenantOnly {
        //require(status == ContractStatus.DEDUCTION_AGREED || status == ContractStatus.DISPUTE_RESOLVED || status == ContractStatus.MONEY_WITHDRAWAL);
    

        uint transferAmount = paidDeposit;

        msg.sender.transfer(transferAmount);

        StatusChanged(contractAddress, msg.sender, uint(status));
        MoneyWithdrawn(contractAddress, msg.sender, transferAmount);
        BalanceChanged(contractAddress, msg.sender, contractAddress.balance);
    }*/


    function getExpectedDeposit() view public returns (uint) {
        return expectedDeposit;
    }

    function getPaidDeposit() view public returns (uint) {
        return paidDeposit;
    }

    function getContractBalance() view public returns (uint) {
        return contractAddress.balance;
    }

    function getTenantBalance() view public tenantOnly returns (uint) {
        return msg.sender.balance;
    }

    function getLandlordBalance() view public landlordOnly returns (uint) {
        return msg.sender.balance;
    }

    function getContractStatus() view public returns (ContractStatus) {
        return status;
    }

}