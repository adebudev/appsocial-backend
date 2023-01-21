import { save } from '../adapter/contact.adapter.js';
import { getGroups, groupSave, groupUpdate } from '../adapter/wp.adapter.js';

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
  
  const group = async (req, res) => {
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

  const getAllGroups = async (req, res) => {
    try {
        const response = await getGroups(req.body.userId);
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
  
  export { contactSave, contactUpdate, getAllGroups, group, groupUp }