const payment = [
  {
    name: "Paid",
    id: "1",
  },
  {
    name: "UnPaid",
    id: "2",
  },
];

const status = [
  {
    name: "Open",
    id: "1",
  },
  {
    name: "Processing",
    id: "2",
  },
  {
    name: "Our For Delivery",
    id: "3",
  },
  {
    name: "Delivered",
    id: "4",
  },
];

const tableHead = [
    {
      id: "date",
      label: "Date",
      maxWidth: "10%",
      align: "left",
    },
    {
      id: "orderno",
      label: "Order No",
      maxWidth: "10%",
      align: "left",
    },
    {
      id: "customername",
      label: "Customer Name",
      maxWidth: "10%",
      align: "left",
    },
    {
      id: "city",
      label: "City",
      maxWidth: "10%",
      align: "left",
    },
    {
      id: "quantity",
      label: "Quantity",
      maxWidth: "10%",
      align: "center",
    },
    {
      id: "totalamount",
      label: "Total Amount",
      maxWidth: "10%",
      align: "left",
    },
    {
      id: "paymentstatus",
      label: "Payment Status",
      maxWidth: "15%",
      align: "left",
    },
    {
      id: "orderstatus",
      label: "Order Status",
      maxWidth: "15%",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      maxWidth: "10%",
    },
  ];

const orderlist = [
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Unpaid",
    orderstatus: "Processing",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Paid",
    orderstatus: "Delivered",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Paid",
    orderstatus: "Cancelled",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Paid",
    orderstatus: "Shipped",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Unpaid",
    orderstatus: "Out for Delivery",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Refund",
    orderstatus: "Out for Delivery",
  },
  {
    date: "31-08-2021",
    orderno: "12345",
    customername: "Martin",
    city: "Los Vegas",
    quantity: "3",
    totalamount: "30000",
    paymentstatus: "Paid",
    orderstatus: "Out for Delivery",
  },
];

const innerTable = [
  {
    id: "image",
    label: "Image",
    maxWidth: "5%",
    align: "left"
  },
  {
    id: "suborderno",
    label: "SubOrder No",
    maxWidth: "10%",
    align: "left"
  },
  {
    id: "Itemname",
    label: "Item Name",
    maxWidth: "20%",
    align: "left"
  },
  {
    id: "price",
    label: "Price",
    maxWidth: "5%",
    align: "left"
  },
  {
    id: "quantity",
    label: "Quantity",
    maxWidth: "7%",
    align: "left"
  },
  {
    id: "amount",
    label: "Amount",
    maxWidth: "5%",
    align: "left"
  },
  {
    id: "discount",
    label: "Discount",
    maxWidth: "5%",
    align: "left"
  },
  {
    id: "total",
    label: "Total Amount",
    maxWidth: "8%",
    align: "left"
  },
  {
    id: "orderstatus",
    label: "OrderStatus",
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

const innertableData = [
  {
    source: "../../assets/images/Product Images/Artboard 1.png",
    suborderno: "ZB00001A",
    name: "Kanubia Easy 7 Syn Yaki Prem",
    price: "1000",
    quantity: "4",
    amount: "4000",
    discount: "10%",
    totalamount: "3600",
    orderstatus: "processing",
  },
  {
    source: "../../assets/images/Product Images/Artboard 1.png",
    suborderno: "ZB00001A",
    name: "Kanubia Easy 7 Syn Yaki Prem",
    price: "1000",
    quantity: "4",
    amount: "4000",
    discount: "10%",
    totalamount: "3600",
    orderstatus: "processing",
  },
  {
    source: "../../assets/images/Product Images/Artboard 1.png",
    suborderno: "ZB00001A",
    name: "Kanubia Easy 7 Syn Yaki Prem",
    price: "1000",
    quantity: "4",
    amount: "4000",
    discount: "10%",
    totalamount: "3600",
    orderstatus: "processing",
  },
  {
    source: "../../assets/images/Product Images/Artboard 1.png",
    suborderno: "ZB00001A",
    name: "Kanubia Easy 7 Syn Yaki Prem",
    price: "1000",
    quantity: "4",
    amount: "4000",
    discount: "10%",
    totalamount: "3600",
    orderstatus: "processing",
  },
  {
    source: "../../assets/images/Product Images/Artboard 1.png",
    suborderno: "ZB00001A",
    name: "Kanubia Easy 7 Syn Yaki Prem",
    price: "1000",
    quantity: "4",
    amount: "4000",
    discount: "10%",
    totalamount: "3600",
    orderstatus: "processing",
  },
]

const subtableHead = [
  {
    id: "logisticpartner",
    label: "Logistic Partner",
    maxWidth: "16%",
    align: "left"
  },
  {
    id: "trackingnumber",
    label: "Tracking Number",
    maxWidth: "16%",
    align: "left"
  },
  {
    id: "shipmentdate",
    label: "Shipment Date",
    maxWidth: "16%",
    align: "left"
  },
  {
    id: "expecteddelivery",
    label: "Expected Delivery",
    maxWidth: "16%",
    align: "left"
  },
  {
    id: "deliverydate",
    label: "Delivery Date",
    maxWidth: "16%",
    align: "left"
  },
  {
    id: "shipmentstatus",
    label: "Shipment Status",
    maxWidth: "16%",
    align: "left"
  },
]

const orderlistData = [
  {
    logisticpartner: "fedEx Express",
    trackingnumber: "ZBT001",
    shipmentdate: "02 sep 2021",
    expecteddelivery: "07 sept 2021",
    deliverydate: "07 sept 2021",
    shipmentstatus: "Success"
  },
  {
    logisticpartner: "fedEx Express",
    trackingnumber: "ZBT001",
    shipmentdate: "02 sep 2021",
    expecteddelivery: "07 sept 2021",
    deliverydate: "07 sept 2021",
    shipmentstatus: "Success"
  },
];

export { payment, status, orderlist, tableHead, innerTable, innertableData, subtableHead, orderlistData };
