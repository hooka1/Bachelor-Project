module.exports = {
    head1: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    head2: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 8,
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 3,
    },
    label2: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 3,
    },
    input: {
        //the style of input used on login screen, the key difference is the padding
        backgroundColor: "#D1D3D6",
        borderRadius: 5,
        borderColor:"#D1D3D6",
        paddingHorizontal: 10,
        paddingVertical: 10,
        color:'#000000',

    },
    input2: {
        //the style of input used for signup page and for some verification pages
       flex:1,
        marginTop: Platform.OS=='android'?0:-12,
        paddingLeft:10,
        marginLeft:5,
        color:'#000000',
        backgroundColor: "#D1D3D6",
        borderColor:"#D1D3D6",
        borderRadius: 5,
        paddingHorizontal: 1,
        paddingVertical: 1,
        // paddingVertical: 0,
    },
    input3: {
        //the style of input used in most verifcation pages
         marginTop: Platform.OS=='android'?0:-12,
         paddingLeft:10,
         marginLeft:5,
         color:'#000000',
         backgroundColor: "#D1D3D6",
         borderColor:"#D1D3D6",
         borderRadius: 5,
         paddingHorizontal: 1,
         paddingVertical: 1,
         // paddingVertical: 0,
     },
    link: {
        //This is the link itself
        color: '#4267B3',
        fontSize: 15,
    },
    link2: {
        //this is the link title
        color: 'grey',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 10,
    },
    input1: {
        backgroundColor: "#FFB0CC",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 100,
        textAlignVertical: 'top',

    },
    errormessage: {
        //this is the style for the error message
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#F50057',
        padding: 5,
        borderRadius: 10,
    },
    bwmessage: {
       // this is the style for the subheader below verifcation pages
        // color: 'white',
        // backgroundColor: '#4267B3',
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
    }
}