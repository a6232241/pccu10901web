import React, { useState } from 'react';
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from 'react-bootstrap';

import templateAPI from '../../APIs/templateAPI';
import LANG from '../../languages/zh-tw.json';

export default function AddBar({ svg_id, setBody }) {
  const [term, setTerm] = useState(LANG.term + LANG.name);
  const [termType, setTermType] = useState(LANG.choice + LANG.type);
  const [data, setData] = useState(LANG.default + LANG.data);

  const setNewData = (newData) => {
    templateAPI
      .createTemplate(newData)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>{LANG.term}</InputGroup.Text>
      </InputGroup.Prepend>

      <Form.Control
        placeholder={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      <TypeDropdown termType={termType} setTermType={setTermType} />

      <Form.Control
        placeholder={data}
        onChange={(e) => setData(e.target.value)}
      />

      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => {
            const newData = {
              term_name: term,
              type: termType,
              data: data,
            };
            setBody((oldBody) => [...oldBody, newData]);
            setNewData({ template_id: svg_id, ...newData });
          }}>
          {LANG.new}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

function TypeDropdown({ termType, setTermType }) {
  const items = [];
  Object.keys(LANG.types).forEach((key) => {
    items.push(
      <Dropdown.Item key={key} eventKey={LANG.types[key]}>
        {LANG.types[key]}
      </Dropdown.Item>,
    );
  });
  return (
    <DropdownButton
      as={InputGroup.Prepend}
      variant="outline-secondary"
      title={termType}
      id="items"
      onSelect={(e) => {
        setTermType(e);
      }}>
      {items}
    </DropdownButton>
  );
}
