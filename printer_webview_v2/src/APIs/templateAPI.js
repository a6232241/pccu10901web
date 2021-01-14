import api from './api';

const templateAPI = {};

templateAPI.getAllTemplate = () => {
  const url = `/template`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

templateAPI.createTemplate = (newTemplate) => {
  const url = `/template`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data: newTemplate,
  });
};

templateAPI.getTemplate = (id) => {
  const url = `/template/${id}`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};

templateAPI.editTemplate = (id, newTemplate) => {
  const url = `/template/${id}`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    data: newTemplate,
  });
};

templateAPI.deleteTemplate = (id) => {
  const url = `/template/${id}`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};

templateAPI.getRelatedTemplate = (template_ID) => {
  const url = `/template/all/${template_ID}`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
}

export default templateAPI;
