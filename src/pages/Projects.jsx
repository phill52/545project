import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery } from "react-query";

export default function Projects() {
	const { id } = useParams();

	//var dataList = [{id:1,title:'Project 1',description:'Project 1 Description'},{id:2,title:'Project 2',description:'Project 2 Description'}];

	var numProjects = 2;

	// Define the function to fetch project data
	const fetchProject = async () => {
		if (isNaN(id)) {
			throw new Error("Project ID must be a number");
		}
		const project = await db.projects.get(parseInt(id));
		let shifts = [];
		console.log(project);
		for (let id of project.shifts) {
			let shift = await db.shifts.get(parseInt(id));
			shifts.push(shift);
		}
		project.shifts = shifts;
		return project;
	};

	const {
		data: project,
		isLoading,
		error,
	} = useQuery(["project", id], fetchProject, {
		enabled: !!id && !isNaN(id), // This ensures the query runs only if id is available
	});

	// Loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const timeElapsed = (shifts) => {
		//calculates the time and returns it as hours and minutes
		let total = 0;
		for (let shift of shifts) {
			total += shift.end - shift.start;
		}
		total = Math.floor(total / 1000);
		total = Math.floor(total / 3600);
		let minutes = Math.floor((total / 60) % 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		total = `${total} hours, ${minutes} minutes`;
		return total;
	};

	const dataList = ()=>{
		const projectList = [
		{id:1,title:'Project 1',description:'Project 1 Description',ended:'12:30',total:'5 hours, 30 minutes',pay:'$10'},
		{id:2,title:'Project 2',ended:'5:45',total:'12 hours, 11 minutes',pay:'$15'},
		{id:3,title:'Project 3',ended:'5:30',total:'12 hours, 11 minutes',pay:'$15'},
		{id:4,title:'Project 4',ended:'5:45',total:'12 hours, 11 minutes',pay:'$15'},
		{id:5,title:'Project 5',ended:'5:45',total:'12 hours, 11 minutes',pay:'$15'}];

		return <CardList items={projectList}/>;
	}

	const totalPay = (shifts, payrate) => {
		//calculates the total pay for the project
		let total = 0;
		for (let shift of shifts) {
			total += shift.end - shift.start;
		}
		total = Math.floor(total / 1000);
		total = Math.floor(total / 3600);
		total = total * payrate;
		return total;
	};

	const formatDateTime = (date) => {
		// Pad with a zero if the number is less than 10
		function pad(number) {
			return number < 10 ? "0" + number : number;
		}

		let month = pad(date.getMonth() + 1); // getMonth() returns months from 0-11
		let day = pad(date.getDate());
		let year = date.getFullYear();
		let hour = date.getHours() % 12;
		let minute = pad(date.getMinutes());
		let period = hour > 12 ? "PM" : "AM";
		return `${month}/${day}/${year} ${hour}:${minute} ${period}`;
	};

	const hoursDifference = (datetime1, datetime2) => {
		//outputs 6.2
		// Calculate difference in milliseconds
		let differenceInMilliseconds = Math.abs(datetime1 - datetime2);
		// Convert milliseconds to hours and round to two decimal places
		let differenceInHours = (
			differenceInMilliseconds /
			(1000 * 60 * 60)
		).toFixed(2);
		return `${differenceInHours} hours`;
	};

	const hoursDifference2 = (datetime1, datetime2) => {
		//outputs '6 hours, 12 minutes'
		// Calculate the absolute difference in milliseconds
		let differenceInMilliseconds = Math.abs(datetime1 - datetime2);

		// Convert milliseconds to minutes and hours
		let totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;

		return `${hours} hours, ${minutes} minutes`;
	};

	const Card2 = ({item})=>{
		if(!item){
			return null;
		}
		return (
			
			<Card>
				<h2 className="text-darkviolet font-bold font-underline text-4xl pb-4 pt-8">{item.title}</h2>
        <div className="bg-lightgreen rounded-[30px] text-center text-cream text-4xl py-3.5">
          Select Project
        </div>
        <div className='flex flex-row mt-2 mb-6'>
          <div>
            <ul className='text-left text-darkviolet text-4xl w-full'>
              <li>Last ended at {item.ended}</li>
              <li>Total time: {item.total}</li>
              <li>Pay rate: {item.pay}</li>

            </ul>
          </div>

          <div className='flex flex-col w-[60%]'>
            <div className='bg-brightyellow rounded-[30px] text-3xl py-16 text-darkviolet'>
              Delete Project
            </div>
          </div>
    	</div>
			</Card>
		
		);
	}	

	const CardList = ({items}) => {
		if(!items){
			return null;
		}
		return (
			<div>
			<div>
				{items.map(item => (
					<Card2 key = {item.id} item={item}/>
				))}
			</div>
			</div>
		)
	}
 
	


	// Render project data
	return (
		<div className="flex flex-col  align-center h-screen home-grad px-[12%]">
   
	{dataList()
	}
	  
	
	  
  </div>
	);
}
