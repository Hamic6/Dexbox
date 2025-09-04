import React from 'react';
import AddClient from './add';

export default function ModifierClient({ client, onSave, onCancel }) {
  return (
    <AddClient
      mode="edit"
      client={client}
      onSave={onSave}
    />
  );
}