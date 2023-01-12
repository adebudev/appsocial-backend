import { save } from '../adapter/contact.adapter.js';
import { groupSave, groupUpdate } from '../adapter/wp.adapter.js';

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
  
  export { contactSave, contactUpdate, group, groupUp }