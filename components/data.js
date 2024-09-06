const data = [
    {
        "title" : "First data" ,
        "id" : "1",
        "sub_title" : "This is the sub heading for the first graph over here, you can choose to change the content of this text" ,
        "data" : [
            { y: 67, label: "Children" },
            { y: 28, label: "Adults" },
            { y: 10, label: "Aged" },
        ]
    }
    ,
    {
        "title" : "Second data" ,
        "id" : "2",
        "sub_title" : "This is the sub heading for the first graph over here, you can choose to change the content of this text" ,
        "data" : [
            { y: 67, label: "Children" },
            { y: 28, label: "Adults" },
            { y: 10, label: "Aged" },
        ]
    }
]

const graphData =[
    {
        "title": "Price Change of Producers",
        "id" : "5",
        "sub_title":"This sub heading shows the Price Change of Producers",
    "data": [
    { x: new Date(2024, 0), y: [27.10, 38.99] },
    { x: new Date(2024, 1), y: [29.92, 37.00] },
    { x: new Date(2024, 2), y: [35.95, 42.54] },
    { x: new Date(2024, 3), y: [37.27, 48.50] },
    { x: new Date(2024, 4), y: [43.33, 50.51] },
    { x: new Date(2024, 5), y: [46.69, 52.86] },
    { x: new Date(2024, 6), y: [41.80, 50.75] },
    { x: new Date(2024, 7), y: [41.51, 51.22] },
    { x: new Date(2024, 8), y: [45.09, 50.14] },
    { x: new Date(2024, 9), y: [47.98, 53.73] },
    { x: new Date(2024, 10), y: [43.57, 50.49] },
    { x: new Date(2024, 11), y: [51.51, 57.89] }
        ]
    }
]

export default data
export { graphData }