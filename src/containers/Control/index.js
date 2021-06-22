import React from 'react';
import { useForm } from 'react-hook-form';
import './style.css';

function Control() {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => { 
    console.log(data); 
  };

  return (
    <div className='control'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="startDate">Start Date</label>
          <input name='startDate' type="date" {...register('startDate')} />
        </div>
        <div className="form-control">
          <label htmlFor="endDate">End Date</label>
          <input type="date" name='endDate' {...register('endDate')} />
        </div>
        <div className="formControl">
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default Control;
