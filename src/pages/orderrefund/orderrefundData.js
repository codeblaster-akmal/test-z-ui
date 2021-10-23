const status = [{ name: "Refunded" }, { name: "Pending" }];

const tableHead = [
    {
        id: "date",
        label: "Date",
        maxWidth: "10%",
        align: "left"
    },
    {
        id: "orderid",
        label: "Order ID",
        maxWidth: "10%",
        align: "left"
    },
    {
        id: "type",
        label: "Type",
        maxWidth: "10%",
        align: "left"
    },
    {
        id: "refundamount",
        label: "Refund Amount",
        maxWidth: "10%",
        align: "left"
    },
    {
        id: "status",
        label: "Status",
        maxWidth: "10%",
        align: "left"
    },
    {
        id: "action",
        label: "Action",
        maxWidth: "5%",
        align: "left"
    },
]

const tableData = [
    {
        date: "03-09-2021",
        orderid: "ZB000001",
        type: "Cancel",
        refundamount: "3000",
        status: "Success",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000002",
        type: "Return",
        refundamount: "5000",
        status: "Pending",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000003",
        type: "Return",
        refundamount: "4000",
        status: "Success",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000004",
        type: "Cancel",
        refundamount: "3000",
        status: "Pending",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000005",
        type: "Cancel",
        refundamount: "5500",
        status: "Success",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000006",
        type: "Return",
        refundamount: "1000",
        status: "Failure",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000007",
        type: "Cancel",
        refundamount: "7000",
        status: "Pending",        
    },
    {
        date: "03-09-2021",
        orderid: "ZB000008",
        type: "Return",
        refundamount: "3300",
        status: "Success",        
    },

];

const innertableData = [
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Pending",
    },
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Success",
    },
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Failure",
    },
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Failure",
    },
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Pending",
    },
    {
      itemorderid: "ZB00001A",
      productname: "Kanubia Easy 7 Syn Yaki Prem",
      quantity: "4",
      price: "1000",
      refunditemamount: "4000",
      reason: "Color",
      status: "Success",
    },
  ];

export {
    status,
    tableHead,
    tableData,
    innertableData
}