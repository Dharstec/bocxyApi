const getEmail = require("./getmail")

module.exports = {
    orderPdf(customerDetails) {
        // console.log(customerDetails)
        return new Promise(async (resolve, reject) => {
            try {
                const order = await getEmail.getOrderDetails(customerDetails.customerEmailId)
                console.log("order", order);
                const pdfFilename = await getEmail.generatepdfOrder(order);
                console.log("pdfFilename", pdfFilename);
                const sendEmail = await getEmail.sendEmailForOrder(order, pdfFilename,customerDetails);
                console.log(sendEmail);
                resolve(sendEmail)

            } catch (error) {
                reject(`reject`);
            }
        });
    },

}

