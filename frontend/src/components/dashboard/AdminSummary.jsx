import React from 'react'
import SummaryCards from './SummaryCards'
import { FaBuilding, FaCheckCircle, FaCircle, FaFileAlt, FaHourglass, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

function AdminSummary() {
  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCards icon={<FaUser />} text="Total Employees" number={13} color="bg-blue-500"/>
            <SummaryCards icon={<FaBuilding />} text="Total Departments" number={5} color="bg-yellow-600"/>
            <SummaryCards icon={<FaMoneyBillWave />} text="Monthly Salary" number={654} color="bg-red-600"/>
        </div>
        <div className='mt-12'>
            <h4 className='text-center text-2xl font-bold'>Leave Details</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <SummaryCards icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-blue-500"/>
            <SummaryCards icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-600"/>
            <SummaryCards icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-yellow-600"/>
            <SummaryCards icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-600"/>
            </div>

        </div>
    </div>
  )
}

export default AdminSummary