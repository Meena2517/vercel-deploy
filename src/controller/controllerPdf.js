var Desk = require('../model/modelResume')
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports.generatePDFFromHTML = async (html) => {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
            },
            printBackground: true
        });
        await browser.close();
        return pdfBuffer;
    } catch (error) {
        throw new Error(`Error generating PDF: ${error.message}`);
    }
}

module.exports.generatePDF = async (req, res) => {
    try {
        const reqData = req.body;
        // const data = await Desk.find({ _id : reqBody.id });
        // const reqData = data[0];
        const skills = JSON.parse(reqData.skills);
        const experience = JSON.parse(reqData.experience);
        const tableData = JSON.parse(reqData.tableData);
        const html = `
            <body style="border: 4px double black; outline: 2px solid black; padding: 20px;">
                <div style="position : absolute; margin-right : 35px; margin-top : 12.5px; top : 0; right : 0;">
                    <img src="${reqData.photo}" alt="Photo" style="margin-top: 10px; width: 100px; height: 120px;">
                </div>
                <div style="margin: 0 auto; max-width: 800px;">
                    <div style = "text-align : center;">
                        <h3>RESUME</h3>
                    </div>
                    <div>
                        <h3 style="margin:0">${reqData.name}</h3>
                        <div>${reqData.designation}</div>
                            <div><span style="font-weight: 600">Email: </span>${reqData.email}</div>
                            <div><span style="font-weight: 600">Mobile Number: </span>${reqData.mobileNumber}</div>
                    </div>
                    <div style="border-top: 2px solid black; margin: 5px 0;background-color: lightblue;"></div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0; background-color: lightblue; width: 100%; padding : 3px 0px;">Career Objective:</h4>
                        <p style="margin: 0; text-align: justify; margin-top: 10px;">${reqData.objective}</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0; background-color: lightblue; width: 100%; padding : 3px 0px;">Educational Qualification:</h4>
                        <table style="border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 10px;">
                            <tr>
                                <th style="border: 1px solid black; padding: 8px;">Year</th>
                                <th style="border: 1px solid black; padding: 8px;">Degree / Examination</th>
                                <th style="border: 1px solid black; padding: 8px;">Institute</th>
                                <th style="border: 1px solid black; padding: 8px;">Board / University</th>
                                <th style="border: 1px solid black; padding: 8px;">% / CGPA</th>
                            </tr>
                            ${tableData.map((item, index) => `
                                <tr key=${index} style="border: 1px solid black; text-align: center;">
                                    <td style="border: 1px solid black; padding: 8px;">${item.year}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.degree}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.institute}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.university}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.cgpa}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0; background-color: lightblue; width: 100%; padding : 3px 0px;">Skills:</h4>
                        <ul style="margin-top: 10px;">
                            ${skills.map((item, index) => `
                                <li key=${index} style="margin: 0; margin-bottom: 10px;">${item}</li>
                            `).join('')} 
                        </ul>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0;background-color: lightblue; width: 100%; padding : 3px 0px;">Experience:</h4>
                        <ul style="margin-top: 10px;">
                            ${experience.map((item, index) => `
                                <li key=${index} style="margin: 0; margin-bottom: 10px;">${item}</li>
                            `).join('')} 
                        </ul>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0; background-color: lightblue; width: 100%; padding : 3px 0px;">Personal Details:</h4>
                        <table style="width: 100%;">
                            <tbody>
                                <tr>
                                    <td style="width: 30%;">Father Name</td>
                                    <td style="width: 10%;">:</td>
                                    <td style="width: 60%;">${reqData.fatherName}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%;">Gender</td>
                                    <td style="width: 10%;">:</td>
                                    <td style="width: 60%;">${reqData.gender}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%;">Date of Birth</td>
                                    <td style="width: 10%;">:</td>
                                    <td style="width: 60%;">${reqData.dob}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%;">Address</td>
                                    <td style="width: 10%;">:</td>
                                    <td style="width: 60%;">${reqData.address1}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%;"></td>
                                    <td style="width: 10%;"></td>
                                    <td style="width: 60%;">${reqData.address2}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0; background-color: lightblue; width: 100%; padding : 3px 0px;">Declaration:</h4>
                        <p style="margin: 0; text-align: justify; margin-top: 10px;">${reqData.declaration}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top : 10px">
                        <div><span style="font-weight : 600;">Place :</span> ${reqData.place}</div>
                        <div>(<span style="font-weight : 600;">${reqData.name}</span>)</div>
                    </div>
                </div>
            </body>
        `;
        const pdfBuffer = await module.exports.generatePDFFromHTML(html);
        const base64Pdf = pdfBuffer.toString('base64');

        //const fileName = 'generated_pdf.pdf'; // Name for the PDF file
        //const filePath = `${fileName}`; // Path where you want to save the PDF file
        
        // Write the PDF buffer to the file system
        // fs.writeFileSync(filePath, pdfBuffer);
        res.send({ status: true, data: { pdf: base64Pdf } });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}


module.exports.addDesk = async (req, res) => {
    try {
        const { loginEmail, name, photo, gender, dob, fatherName, designation, email, mobileNumber, address1, address2, objective, skills, experience, tableData, declaration, place } = req.body;      
        const desk = new Desk({ loginEmail, name, photo, gender, dob, fatherName, designation, email, mobileNumber, address1, address2, objective, skills, experience, tableData, declaration, place });
        const result = await desk.save();
        res.send({ status: true, data: desk });
    } catch (error) {
        res.send({ status: false, data: error });
    }
};



module.exports.getResumeData = async (req, res) => {
    try {
        const reqData = req.query;
        let desks = await Desk.find({ loginEmail : reqData.email });
        res.send({ status: true, data: desks })
    }
    catch (error) {
        res.send({ status: false, data: error })
    }
}


module.exports.getResumeDatabyID = async (req, res) => {
    try {
        const reqData = req.query;
        let desks = await Desk.find({ _id : reqData.id });
        res.send({ status: true, data: desks })
    }
    catch (error) {
        res.send({ status: false, data: error })
    }
}


module.exports.updateResumeData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const updatedDesk = await Desk.findByIdAndUpdate(id, updatedFields, {
            new: true,
        });
        if (!updatedDesk) {
            return res.send({ status: false, message: 'Desk not found' });
        }
        res.send({ status: true, message: updatedDesk });
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: 'Error updating desk' });
    }
};



{/* <div style="display: flex; justify-content: space-between;">
                        <div>
                            <div>${reqData.formData.address1}</div>
                            <div>${reqData.formData.address2}</div>
                        </div>
                        <div>
                            <div><span style="font-weight: 600">Email: </span>${reqData.formData.email}</div>
                            <div><span style="font-weight: 600">Mobile Number: </span>${reqData.formData.mobileNumber}</div>
                        </div>
                    </div>
                    <div style="border-top: 2px solid black; margin: 5px 0;"></div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0;">Career Objective:</h4>
                        <p style="margin: 0; text-align: justify; margin-top: 10px;">${reqData.formData.objective}</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0;">Educational Qualification:</h4>
                        <table style="border-collapse: collapse; width: 100%; border: 1px solid black; margin-top: 10px;">
                            <tr>
                                <th style="border: 1px solid black; padding: 8px;">Year</th>
                                <th style="border: 1px solid black; padding: 8px;">Degree / Examination</th>
                                <th style="border: 1px solid black; padding: 8px;">Institute</th>
                                <th style="border: 1px solid black; padding: 8px;">Board / University</th>
                                <th style="border: 1px solid black; padding: 8px;">% / CGPA</th>
                            </tr>
                            ${reqData.tableData.map((item, index) => `
                                <tr key=${index} style="border: 1px solid black; text-align: center;">
                                    <td style="border: 1px solid black; padding: 8px;">${item.year}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.degree}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.institute}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.university}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${item.cgpa}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0;">Skills:</h4>
                        <ul style="margin-top: 10px;">
                            ${reqData.formData.skills.map((item, index) => `
                                <li key=${index} style="margin: 0; margin-bottom: 10px;">${item}</li>
                            `).join('')} 
                        </ul>
                    </div>
                    <div style="margin-top: 20px;">
                        <h4 style="margin: 0;">Experience:</h4>
                        <ul style="margin-top: 10px;">
                            ${reqData.formData.experience.map((item, index) => `
                                <li key=${index} style="margin: 0; margin-bottom: 10px;">${item}</li>
                            `).join('')} 
                        </ul>
                    </div> */}
