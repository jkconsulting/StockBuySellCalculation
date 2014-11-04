var objBuy = {
    objName:	"buyInfo",
    availAmt:	0,
    stockPrice:	0,
    transCost:	0,
    amtLeft:	0,
    totalCost:	0,
    numShares:	0    
};

var objSell = {
    objName:	"sellInfo",
    calType:	"",
    stockPrice:	0,
    transCost:	0,
    numShares:	0,
    targetPrice:0,
    priceDiff:	0,
    gainPct:	0,
    gainAmt:	0,
    transTotal:	0,
    netGain:	0
};


function storeObj2Memory(anObj){
    //alert("storeObj2Memory: " + anObj.objName);
    var objName = anObj.objName;
    for (var key in anObj) {
        //alert("key = " + key);
        if (key != "objName") {
            var aKey = objName+"_"+key;
            var val = anObj[key];
            //alert("aKey: " + aKey + ", val: " + val);
			window.localStorage.setItem(aKey, val);
        }
    }
    
}

function loadMemory2Obj(anObj){
    //alert("loadMemory2Obj: " + anObj.objName); 
    for (var key in anObj) {
        //alert("key = " + key);
        if (key != "objName") {
            var aKey = anObj.objName+"_"+key;
            //alert("aKey = " + aKey);
            if (localStorage.getItem(aKey) === null) {
                //alert("aKey: " + aKey + " Not Found");
            }else{
                var aVal = window.localStorage.getItem(aKey);
                //alert("aKey = " + aKey + ", aVal = " + aVal);
				anObj[key] = aVal;
            }
        }
    }    
}

function printObj(anObj){
    var resString = "";
    for (var key in anObj) {
        var val = anObj[key];
        resString = resString + key +  ": " + val + "; ";
    }
    alert(resString);
}

function rememberBuyStockValues() {
    //alert("rememberBuyStockValues");
    
	var availAmt	= Appery('txtAvailAmt').asNumber();
	var stockPrice	= Appery('txtStockPrice').asNumber();
	var transCost	= Appery('txtTransactionCost').asNumber();    
	var amtLeft		= Appery('lblAmtLeft').asNumber();
    var totalCost	= Appery('lblTotalCost').asNumber();
    var numShares	= Appery('lblNumShares').asNumber();
    //alert(availAmt + ", " + stockPrice + ", " + transCost + ", " + amtLeft + ", " + totalCost + ", " + numShares);

    objBuy.availAmt		= availAmt;
    objBuy.stockPrice	= stockPrice;
    objBuy.transCost	= stockPrice;
    objBuy.amtLeft		= amtLeft;
    objBuy.totalCost	= totalCost;
    objBuy.numShares	= numShares;
    
    //printObj(objBuy);
    storeObj2Memory(objBuy);

}

function rememberSellStockValues() {
    //alert("rememberSellStockValues");
    
    var stockPrice		= Appery('txtPurchasedPrice').asNumber();
    var transCost		= Appery('txtSellCost').asNumber();
    var numShares		= Appery('txtNumShares').asNumber();
	var targetPrice		= Appery('txtTargetPrice').asNumber();
	var priceDiff		= Appery('txtPriceDiff').asNumber();
	//var gainPct			= numeral().unformat(Appery('txtGainPct'));   
    var gainPct			= Appery('txtGainPct').asNumber(); 
	var gainAmt			= Appery('txtGainAmt').asNumber();
    var transTotal		= Appery('lblTransactionTotal').asNumber();
    var netGain			= Appery('txtNetGain').asNumber();  
    
    objSell.stockPrice	= stockPrice;
    objSell.transCost	= transCost;
    objSell.numShares	= numShares;
    objSell.targetPrice	= targetPrice;
    objSell.priceDiff	= priceDiff;
    objSell.gainPct		= gainPct;
    objSell.gainAmt		= gainAmt;
    objSell.transTotal	= transTotal;
    objSell.netGain		= netGain;
    
    //printObj(objSell);
    storeObj2Memory(objSell);

}

function loadBuyStockValues() {
	//alert("loadBuyStockValues");
    
    loadMemory2Obj(objBuy);
    
    //alert("finish loading buy object");
    
	Appery('txtAvailAmt').val(objBuy.availAmt).formatCurrency();
    Appery('txtStockPrice').val(objBuy.stockPrice).formatCurrency();
    Appery('txtTransactionCost').val(objBuy.transCost).formatCurrency();
    Appery('lblAmtLeft').text(objBuy.amtLeft).formatCurrency();
    Appery('lblTotalCost').text(objBuy.totalCost).formatCurrency();
    Appery('lblNumShares').text(objBuy.numShares);
   
}

function loadSellStockValues() {
    //alert("loadSellStockValues");
    
    loadMemory2Obj(objSell);

    Appery('txtPurchasedPrice').val(objSell.stockPrice).formatCurrency();
    Appery('txtNumShares').val(objSell.numShares);
    Appery('txtSellCost').val(objSell.transCost).formatCurrency();
    Appery('txtTargetPrice').val(objSell.targetPrice).formatCurrency();
    Appery('txtPriceDiff').val(objSell.priceDiff).formatCurrency();
    Appery('txtGainPct').val(numeral(objSell.gainPct).format('0.00%')); 
    Appery('txtGainAmt').val(objSell.gainAmt).formatCurrency();
    Appery('lblTransactionTotal').text(objSell.transTotal).formatCurrency();
    Appery('txtNetGain').val(objSell.netGain).formatCurrency();    
    
}

function buyStockCalculation(){
    alert("buyStockCalculation");
    
    rememberBuyStockValues(); 
    
    var availAmt	= objBuy.availAmt;
    var stockPrice	= objBuy.stockPrice;
    var transCost	= objBuy.transCost;
    
    /*
    var availAmt	= Appery('txtAvailAmt').asNumber();
    var stockPrice	= Appery('txtStockPrice').asNumber();
    var transCost	= Appery('txtTransactionCost').asNumber();
    */
    //alert(availAmt + ", " + stockPrice + ", " + transCost);
    
    var numShares	= 0;
    var totalCost	= 0;
    var amtLeft		= availAmt; //default not enough to buy any share
    
    if (transCost >= 0 && stockPrice > 0 && availAmt >= transCost + stockPrice) //have money to buy at least one share
    {
        numShares	= Math.floor((availAmt-transCost)/stockPrice);
        totalCost	= (numShares * stockPrice) + transCost;
        amtLeft		= availAmt - totalCost;
        Appery('txtNumShares').val( numShares );
        Appery('txtSellCost').val( transCost ).formatCurrency();
        Appery('txtPurchasedPrice').val( stockPrice ).formatCurrency();
        Appery('txtNetGain').val(0).formatCurrency(); //breakeven
    }
    //alert(numShares + ", " + totalCost + ", " + amtLeft);
    
    Appery('lblAmtLeft').html( amtLeft ).formatCurrency();
    Appery('lblTotalCost').html( totalCost ).formatCurrency();
    Appery('lblNumShares').html( numShares );
    
    rememberBuyStockValues();    
}

function sellStockCalculation(calType){
    //alert("sellStockCalculation: " + typeof(calType) + ", " + calType);

    if(typeof(calType)==='undefined') 
        calType = "NetGain";
    objSell.calType = calType;
    
    //alert("sellStockCalculation: " + objSell.calType);
    
	rememberSellStockValues(); //save the current state
        
	var priceDiff		= sellStockCalculation_PriceDiff(objSell);
    objSell.priceDiff	= priceDiff;
	var targetPrice		= sellStockCalculation_TargetPrice(objSell);
    objSell.targetPrice = targetPrice;
	var gainPct			= sellStockCalculation_GainPct(objSell);
    objSell.gainPct		= gainPct;
	var gainAmt			= sellStockCalculation_GainAmt(objSell);
    objSell.gainAmt		= gainAmt;
    var transTotal		= sellStockCalculation_TransTotal(objSell);
    objSell.transTotal	= transTotal;
    var netGain			= sellStockCalculation_NetGain(objSell);
    objSell.netGain		= netGain;

	//printObj(objSell);    
    storeObj2Memory(objSell); //save the new state
    loadSellStockValues(); //reload to the view
}

function sellStockCalculation_TargetPrice(aSellObj){
    //alert("sellStockCalculation_TargetPrice");
	var purchasedPrice = aSellObj.stockPrice;
	var priceDiff = priceDiff;
    var targetPrice = aSellObj.targetPrice;
    var gainPct = aSellObj.gainPct;
    
    if(aSellObj.calType == "GainPct"){
        targetPrice = purchasedPrice + (1 + gainPct);
    }else{
        priceDiff = sellStockCalculation_PriceDiff(aSellObj);
        targetPrice = purchasedPrice + priceDiff;    
    }
    
    //alert("sellStockCalculation_TargetPrice => " + targetPrice);
    
    return targetPrice;
}

function sellStockCalculation_PriceDiff(aSellObj){
    //alert("sellStockCalculation_PriceDiff");
	var purchasedPrice = aSellObj.stockPrice;
	var targetPrice = aSellObj.targetPrice; 
    var netGain = aSellObj.netGain;
    var numShares = aSellObj.numShares;
    var transCost = aSellObj.transCost;
    var priceDiff = aSellObj.priceDiff;
    
    if(aSellObj.calType == "PriceDiff"){
        //do nothing
    }else if(aSellObj.calType == "NetGain"){
        priceDiff = (netGain + transCost * 2) / numShares;
    }else{
        priceDiff = targetPrice - purchasedPrice;
    }
    
   //alert("sellStockCalculation_PriceDiff => " + priceDiff);
    
    return priceDiff;
}

function sellStockCalculation_GainPct(aSellObj){
    //alert("sellStockCalculation_GainPct");
	var purchasedPrice = aSellObj.stockPrice;
	var priceDiff = aSellObj.priceDiff; 
    var gainPct = aSellObj.gainPct;
    
    if(aSellObj.calType != "GainPct"){
        priceDiff = sellStockCalculation_PriceDiff(aSellObj);
        gainPct = priceDiff/purchasedPrice;
    }
    
    //alert("sellStockCalculation_GainPct => " + gainPct);
    return gainPct;
}

function sellStockCalculation_GainAmt(aSellObj){
    //alert("sellStockCalculation_GainAmt");
	var purchasedPrice = aSellObj.stockPrice;
	var targetPrice = aSellObj.targetPrice;
    var numShares = aSellObj.numShares;
    var priceDiff = aSellObj.priceDiff;
    var gainAmt = aSellObj.gainAmt;
    
    if(aSellObj.calType != "GainAmt"){
        priceDiff = sellStockCalculation_PriceDiff(aSellObj);
        gainAmt = priceDiff * numShares;
    }
    
    //alert("sellStockCalculation_GainAmt => " + gainAmt);    
    return gainAmt;
}

function sellStockCalculation_TransTotal(aSellObj){
    //alert("sellStockCalculation_TransTotal");
	var transCost = aSellObj.transCost;
	var targetPrice = aSellObj.targetPrice;
    var numShares = aSellObj.numShares;
    var transTotal = aSellObj.transTotal;
    
    if(aSellObj.calType != "TransTotal"){
        transTotal = (targetPrice * numShares) - transCost;
    }
    
    //alert("sellStockCalculation_TransTotal => " + transTotal);
    return transTotal;
}

function sellStockCalculation_NetGain(aSellObj){
    //alert("sellStockCalculation_NetGain");
	var gainAmt = aSellObj.gainAmt;
	var transCost = aSellObj.transCost;
    var netGain = aSellObj.netGain;
    
    if(aSellObj.calType != "NetGain")
		netGain = gainAmt - (transCost * 2); //assume buy & sell @ the same cost
    
    //alert("sellStockCalculation_NetGain => " + netGain);
    return netGain;
}

function clearResult(){
    Appery('lblAmtLeft').text('');
    Appery('lblTotalCost').text('');
    Appery('lblNumShares').text('');    
}