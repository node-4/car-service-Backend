const qualificationController = require("../controllers/qualification");
module.exports = (app) => {
    app.post("/qualifications", qualificationController.createQualification);
    app.get("/qualifications", qualificationController.getQualifications);
    app.get("/qualifications/:id", qualificationController.getQualification);
    app.put("/qualifications/:id", qualificationController.updateQualification);
    app.delete(
        "/qualifications/:id",
        qualificationController.deleteQualification
    );
};
