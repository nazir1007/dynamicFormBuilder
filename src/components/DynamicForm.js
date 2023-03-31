import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const DynamicForm = ({ data = [], onSave }) => {
  const [formData, setFormData] = useState([]);

  const handleFieldChange = (event, id) => {
    const { name, value } = event.target;
    const updatedFormData = formData.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setFormData(updatedFormData);
  };

  const handleAddField = () => {
    const newField = { id: uuidv4(), name: '', type: 'string' };
    setFormData([...formData, newField]);
  };

  

  const handleDeleteField = id => {
    const updatedFormData = formData.filter(field => field.id !== id);
    setFormData(updatedFormData);
  };

  const handleAddNestedField = (event, parentId) => {
    const { name, value } = event.target;
    const updatedFormData = formData.map(field => {
      if (field.id === parentId) {
        const nestedField = { 
          id: uuidv4(), 
          name,
           type: value 
          };
        if (!field.fields) {
          field.fields = [];
        }
        if (value === 'object') {
          nestedField.fields = [];
        }
        return { ...field, fields: [...field.fields, nestedField] };
      }
      return field;
    });
    setFormData(updatedFormData);
  };
  const handleSave = () => {
    onSave(formData);
  };


  const renderField = (field, isNested = false) => {
    return (
      <div key={field.id}>
        <input
          type="text"
          name="name"
          value={field.name}
          placeholder="Field Name"
          onChange={event => handleFieldChange(event, field.id)}
        />
        <select
          name="type"
          value={field.type}
          onChange={event => handleFieldChange(event, field.id)}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="object">Object</option>
        </select>
        {field.type === 'object' && (
          <>
            <button onClick={() => handleAddNestedField({ target: { name: '', value: 'string' } }, field.id)}> + </button>
            {field.fields && field.fields.map(nestedField => renderField(nestedField, true))}
          </>
        )}
        {!isNested && <button onClick={() => handleDeleteField(field.id)}> X </button>}
      </div>
    );
  };

  return (
    <>
      {Array.isArray(formData) && formData.map(field => renderField(field))}
      <button onClick={handleAddField}>Add Field</button>
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default DynamicForm;
