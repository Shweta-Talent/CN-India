const express = require("express");
const { v4: uuidv4 } = require("uuid");


const Project = require("../models/project");
const Location = require("../models/location");
const LocationEntity = require("../models/locationEntity");
const DateEntity = require("../models/dateEntity");
const locationEntity = require("../models/locationEntity");
const { generateDates } = require("../utils/generateDate");
const dateEntity = require("../models/dateEntity");

exports.CreateProject = async (req, res) => {
  const {
    body: {
      projectName,
      internalProjectName,
      projectType,
      union,
      projectDescription,
      releaseToTalent,
      showContactInfoToTalent,
      showNetworkToTalent,
      showCastingAssociateToTalent,
      showCastingAssistantToTalent,
      castingPhoneNumberContactInfo,
      castingEmailContactInfo,
      networkCreativeTeam,
      castingAssociateCreativeTeam,
      castingAssistantCreativeTeam,
      contactPhoneNumberCreativeTeam,
      contactEmailCreativeTeam,
      auditionLocation,
      workLocation,
      projectLocation,
      auditionDate,
      workDate,
      auditionDateFrom,
      auditionDateTo,
      workDateFrom,
      workDateTo,
      workRequirements,
      projectSynopsis,
      projectAdditionalDetails,
      additionalFileLink,
      isPublished,
    },
  } = req;
  try {
    if (
      !projectName ||
      !internalProjectName ||
      !projectType ||
      !union ||
      !projectDescription
    )
      throw Error("something is missing");
    const projectId = uuidv4();
    const createdBy = req.userId;

    const project = new Project({
      createdBy: createdBy,
      projectId: projectId,
      projectName: projectName,
      internalProjectName: internalProjectName,
      projectType: projectType,
      union: union,
      projectDescription: projectDescription,
      releaseToTalent: releaseToTalent,

      showContactInfoToTalent: showContactInfoToTalent,
      showNetworkToTalent: showNetworkToTalent,
      showCastingAssociateToTalent: showCastingAssociateToTalent,
      isPublished: false,
    });

    function generateDates(auditionDateFrom, auditionDateTo) {
      const dateList = [];
      let start_date = new Date(auditionDateFrom);
      let end_date = new Date(auditionDateTo);
      while (start_date <= end_date) {
        dateList.push(new Date(start_date));

        start_date.setDate(start_date.getDate() + 1);
      }

      return dateList;
    }

    try {
      const location_array = auditionLocation.split(",");
      for (let i = 0; i < location_array.length; i++) {
        const data = await Location.findOne({
          locationName: location_array[i],
        });
        const id = data.locationId;

        const addData = new LocationEntity({
          locationId: id,
          entityId: projectId,
          entityType: "audition",
        });
        await addData.save();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const location_array = workLocation.split(",");
      for (let i = 0; i < location_array.length; i++) {
        const data = await Location.findOne({
          locationName: location_array[i],
        });
        const id = data.locationId;

        const addData = new LocationEntity({
          locationId: id,
          entityId: projectId,
          entityType: "work",
        });
        await addData.save();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const location_array = projectLocation.split(",");
      for (let i = 0; i < location_array.length; i++) {
        const data = await Location.findOne({
          locationName: location_array[i],
        });
        const id = data.locationId;

        const addData = new LocationEntity({
          locationId: id,
          entityId: projectId,
          entityType: "project",
        });
        await addData.save();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let Dates = [];
      if (auditionDate !== undefined) {
        Dates.push(auditionDate);
      } else if (auditionDateFrom && auditionDateTo) {
        Dates = generateDates(auditionDateFrom, auditionDateTo);
      }
      for (let i = 0; i < Dates.length; i++) {
        const result = new DateEntity({
          entityId: projectId,
          date: Dates[i],
          entityType: "audition",
        });
        await result.save();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let Dates = [];
      if (workDate != undefined) {
        Dates.push(workDate);
      } else if (workDateFrom && workDateTo) {
        Dates = generateDates(workDateFrom, workDateTo);
      }

      for (let i = 0; i < Dates.length; i++) {
        const result = new DateEntity({
          entityId: projectId,
          date: Dates[i],
          entityType: "work",
        });
        await result.save();
      }
    } catch (error) {
      console.log(error);
    }
    const data = await project.save();
    res.send({ status: "success", message: "project created" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProject = async (req, res) => {
  const {
    body: { projectId },
  } = req;
  try {
    const project = await Project.findOneAndDelete(projectId);

    if (!project) throw Error("project not forund");

    const Date = await DateEntity.deleteMany({ entityId: projectId });

    const deleteLocations = await locationEntity.deleteMany({
      entityId: projectId,
    });

    res.send({ status: "success", message: "deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.listProject = async (req, res) => {
  const userId = req.userId;

  try {
    const data = await Project.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $lookup: {
          from: "DateEntity",
          localField: "projectId",
          foreignField: "entityId",
          as: "Dates",
          pipeline: [
            {
              $project: {
                _id: 0,
                entityType: 1,
                date: 1,
              },
            },
          ],
        },
        $lookup: {
          from: "LocationEntity",
          localField: "projectId",
          foreignField: "entityId",
          as: "Location",
          pipeline: [
            {
              $project: {
                _id: 0,
                entityType: 1,
                locationName: 1,
              },
            },
          ],
        },
      },
    ]);

    res.send({
      status: "success",
      message: "Projects successfully found",
      result,
    });
  } catch (error) {
    res.send({ status: "failed", message: "something went wrong" });
  }
};

exports.duplicateProject = async (req, res) => {
  const projectID = req.body.projectId;
  try {
    const toFindProjectId = await Project.findOne({ projectId: projectID });

    if (!toFindProjectId) throw Error("project not found");
    const duplicateProject = new Project({
      ...toFindProjectId,
      _id: uuidv4(),
      projectId: uuidv4(),
    });
    const result = await duplicateProject.save();
  } catch (error) {
    console.log(error);
  }
};

exports.updateProject = async (req, res) => {
  const projectID = req.body.projectId;
  try {
    const toFindProjectId = await Project.findOne({ projectId: projectID });
    if (!toFindProjectId)
      res.send({ status: 200, message: "Project not found" });

    if (req.body.projectName)
      await toFindProjectId.updateOne({ projectName: req.body.projectName });
    if (req.body.internalProjectName)
      await toFindProjectId.updateOne({
        projectName: req.body.internalProjectName,
      });
    if (req.body.projectType)
      await toFindProjectId.updateOne({ projectName: req.body.projectType });
    if (req.body.union)
      await toFindProjectId.updateOne({ projectName: req.body.union });
    if (req.body.projectDescription)
      await toFindProjectId.updateOne({
        projectName: req.body.projectDescription,
      });
    if (req.body.releaseToTalent)
      await toFindProjectId.updateOne({
        projectName: req.body.releaseToTalent,
      });
    if (req.body.workDate)
      await toFindProjectId.updateOne({ projectName: req.body.workDate });
    if (req.body.auditionDate)
      await toFindProjectId.updateOne({ projectName: req.body.auditionDate });
    if (req.body.projectLocation)
      await toFindProjectId.updateOne({
        projectName: req.body.projectLocation,
      });
    if (req.body.isPublished)
      await toFindProjectId.updateOne({
        projectName: req.body.projectLocation,
      });
    if (req.body.workLocation)
      await toFindProjectId.updateOne({ projectName: req.body.workLocation });
    if (req.body.auditionLocation)
      await toFindProjectId.updateOne({
        projectName: req.body.auditionLocation,
      });

    if (req.body.workDateFrom && req.body.workDateTo) {
      let datesToUpdate = [];
      if (req.body.workDateFrom && req.body.workDateTo) {
        datesToUpdate = generateDates(
          req.body.workDateFrom,
          req.body.workDateTo
        );
      }

      datesToUpdate.map(async (dateEntry) => {
        const existingDate = await DateEntity.findOne({ date: dateEntry.date });

        if (existingDate) {
          existingDate.fieldToUpdate = dateEntry.fieldToUpdate;
          await existingDate.save();
        } else {
          const newDateEntry = new DateEntity(dateEntry);
          await newDateEntry.save();
        }
      });
    }

    if (req.body.auditionDateFrom && req.body.auditionDateTo) {
      let datesToUpdate = [];
      if (req.body.auditionDateFrom && req.body.auditionDateTo) {
        datesToUpdate = generateDates(
          req.body.auditionDateFrom,
          req.body.auditionDateTo
        );
      }

      datesToUpdate.map(async (dateEntry) => {
        const existingDate = await DateEntity.findOne({ date: dateEntry.date });

        if (existingDate) {
          existingDate.fieldToUpdate = dateEntry.fieldToUpdate;
          await existingDate.save();
        } else {
          const newDateEntry = new DateEntity(dateEntry);
          await newDateEntry.save();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
