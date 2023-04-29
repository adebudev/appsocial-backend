import { save } from '../adapter/contact.adapter.js';
import { getGroup, getGroupWithContacts, getGroups, groupSave, groupUpdate } from '../adapter/wp.adapter.js';

const contactSave = async (req, res) => {
    try {
      const { id, name, number } = await save(req.body);
      res.status(201).send({
        message: 'success',
        status: 201,
        data: {
          id,
          name,
          number,
        },
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: 400,
      });
    }
  };

  

  const contactUpdate = async (req, res) => {
    try {
      const { id, name, number } = await save(req.body);
      res.status(201).send({
        message: 'success',
        status: 201,
        data: {
          id,
          name,
          number,
        },
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: 400,
      });
    }
  };
  
  const groupSaveData = async (req, res) => {
    try {
      const { id, name } = await groupSave(req.body);
      res.status(201).send({
        message: 'success',
        status: 201,
        data: {
          id,
          name,
        },
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: 400,
      });
    }
  };

  const getContactsByGroup = async (req, res) => {
    try {
        const response = await getGroupWithContacts();
        res.status(200).send({
          message: 'success',
          status: 200,
          data: response,
        });
      }
      catch (error) {
        console.error(error.message);
        res.status(400).send({
          message: error.message,
          status: 400,
        });
      }
  }

  const getAllGroups = async (req, res) => {
    try {
        const response = await getGroups(req.user.id);
        res.status(200).send({
          message: 'success',
          status: 200,
          data: response,
        });
      }
      catch (error) {
        console.log(error.message);
        res.status(400).send({
          message: error.message,
          status: 400,
        });
      }
  }

  const getGroupById = async (req, res) => {
    try {
        const response = await getGroup(req.params.id);
        res.status(200).send({
          message: 'success',
          status: 200,
          data: response,
        });
      }
      catch (error) {
        console.error(error.message);
        res.status(400).send({
          message: error.message,
          status: 400,
        });
      }
  }

  const groupUp = async (req, res) => {
    try {
      const response = await groupUpdate(req.params.id, req.body);
      res.status(201).send({
        message: 'success',
        status: 201,
        data: {...response},
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: 400,
      });
    }
  };
  
  export { contactSave, contactUpdate, getAllGroups, groupSaveData, groupUp, getGroupById, getContactsByGroup }