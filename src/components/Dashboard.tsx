import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'timeoff' | 'birthday'>('timeoff');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for employees list
  const employees = [
    { name: 'Brooklyn Simmons', email: 'brok-simms@mail.com', department: 'Design', title: 'UI Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'Cody Fisher', email: 'cody_fisher99@mail.com', department: 'Development', title: 'Front-End', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Ralph Edwards', email: 'ralp_uxdsg@mail.com', department: 'Design', title: 'UX Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  ];

  // Schedule activities
  const schedule = [
    { time: '08:00', title: 'Online Interview with UI Candidate', duration: '08:00 - 09:30', width: 'w-32', offset: 'left-0', bg: 'bg-neutral-800 text-white' },
    { time: '09:35', title: 'Weekly meeting', duration: '09:35 - 10:30', width: 'w-24', offset: 'left-36', bg: 'bg-neutral-200 text-neutral-800 border border-neutral-300' },
    { time: '10:40', title: 'Psychology test', duration: '10:40 - 11:30', width: 'w-24', offset: 'left-[260px]', bg: 'bg-neutral-900 text-white' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex text-neutral-900 font-sans w-full">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200 p-6 flex flex-col justify-between z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Upper Sidebar Section */}
        <div className="space-y-8">
          
          {/* Logo / Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-black text-lg">S</div>
              <span className="font-extrabold text-lg tracking-tight">StaffSync</span>
            </div>
            <button className="md:hidden text-neutral-500" onClick={() => setSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Org Switcher */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-neutral-900">Rocks Company</h4>
              <p className="text-[10px] text-neutral-500 font-medium mt-0.5">Team - 20 Members</p>
            </div>
            <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 px-3">Main Menu</span>
            
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>

            <a href="#employees" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg text-sm font-medium transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Employees
            </a>

            <a href="#departments" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg text-sm font-medium transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Departments
            </a>

            <a href="#reports" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg text-sm font-medium transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 2v-6m-9 10h12a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
              </svg>
              Reports
            </a>

            <a href="#settings" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg text-sm font-medium transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
          </nav>
        </div>

        {/* Lower Sidebar Section */}
        <div className="pt-6 border-t border-neutral-200">
          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 text-neutral-500 hover:text-black rounded-lg text-sm font-semibold transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8 space-y-6">
        
        {/* Top bar for mobile header */}
        <div className="flex items-center justify-between md:hidden pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-extrabold text-base">Dashboard</span>
          </div>
        </div>

        {/* SECTION 1: Billing/Payment Method Header Widget */}
        <section className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 flex-1">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Cardholder name</span>
              <p className="font-bold text-sm text-neutral-900 mt-1">Rocks Company Ltd</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Account Number</span>
              <p className="font-bold text-sm text-neutral-900 mt-1">•••• •••• •••• 6273</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Expiration</span>
              <p className="font-bold text-sm text-neutral-900 mt-1">12/28</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Payment Method</span>
              <p className="font-bold text-sm text-neutral-900 mt-1 flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-neutral-900 text-white text-[9px] rounded font-extrabold">VISA</span> 
                Debit Card
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0">
            Change Payment Method
          </button>
        </section>

        {/* SECTION 2: Split columns for Schedule, Absences & Quick card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Whats on in January Panel */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-neutral-900">What's on in January?</h3>
              
              {/* Tab Selector */}
              <div className="bg-neutral-100 p-1 rounded-xl flex gap-1 mt-4">
                <button 
                  onClick={() => setActiveTab('timeoff')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'timeoff' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Time Off
                </button>
                <button 
                  onClick={() => setActiveTab('birthday')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'birthday' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Birthday
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 mt-6">
                {activeTab === 'timeoff' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img className="w-9 h-9 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="" />
                        <div>
                          <p className="font-bold text-xs text-neutral-900">Elanoire Maggie</p>
                          <p className="text-[10px] text-neutral-500 font-medium">UI UX Designer</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold rounded-md">Sick Leave</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img className="w-9 h-9 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" alt="" />
                        <div>
                          <p className="font-bold text-xs text-neutral-900">Kevin Malona</p>
                          <p className="text-[10px] text-neutral-500 font-medium">UI UX Designer</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold rounded-md">Annual Leave</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img className="w-9 h-9 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="" />
                      <div>
                        <p className="font-bold text-xs text-neutral-900">Jeremy Gemoy</p>
                        <p className="text-[10px] text-neutral-500 font-medium">Graphic Design</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-900">Jan 24 🎂</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Today Schedule Widget */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-neutral-900">Today Schedule</h3>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-600">Jan 28, 2024</span>
                  <button className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-bold transition-all">Add Task</button>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="mt-6 relative border-t border-neutral-200 pt-6">
                
                {/* Hours Header labels */}
                <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-4 px-2">
                  <span>08.00</span>
                  <span>09.00</span>
                  <span>10.00</span>
                  <span>11.00</span>
                </div>

                {/* Timeline Blocks */}
                <div className="space-y-3 relative">
                  {schedule.map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-xl ${item.bg} flex items-center justify-between gap-4 transition-all hover:opacity-95`}>
                      <div>
                        <p className="font-bold text-xs leading-tight">{item.title}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{item.duration}</p>
                      </div>
                      <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: Employees Roster & Hours Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Employee Directory */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-base text-neutral-900">Employee</h3>
                <button className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-700 transition-all">See Details</button>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 text-neutral-400 font-bold">
                      <th className="pb-3 font-semibold">Employee Name</th>
                      <th className="pb-3 font-semibold">Department</th>
                      <th className="pb-3 font-semibold">Job Title</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {employees.map((emp, idx) => (
                      <tr key={idx} className="group hover:bg-neutral-50/50 transition-all">
                        <td className="py-3 flex items-center gap-3">
                          <img className="w-8 h-8 rounded-full object-cover grayscale border border-neutral-100" src={emp.img} alt="" />
                          <div>
                            <p className="font-bold text-neutral-900">{emp.name}</p>
                            <p className="text-[10px] text-neutral-500 font-medium">{emp.email}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded-md border border-neutral-200">
                            {emp.department}
                          </span>
                        </td>
                        <td className="py-3 text-neutral-600 font-medium">{emp.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Member Work Hours Custom Chart */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Member Work Hours</span>
                  <h3 className="font-black text-2xl text-neutral-950 mt-1">120h <span className="text-sm font-semibold text-neutral-500">54m</span></h3>
                </div>
                <button className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-[10px] font-bold text-neutral-700 transition-all">View by Week</button>
              </div>

              {/* Bar Chart Graphics */}
              <div className="mt-8 flex items-end justify-between h-36 gap-2">
                {[
                  { day: 'Jan 24', h: 'h-24', active: true },
                  { day: 'Jan 25', h: 'h-20', active: false },
                  { day: 'Jan 26', h: 'h-28', active: true },
                  { day: 'Jan 27', h: 'h-16', active: false },
                  { day: 'Jan 28', h: 'h-24', active: true },
                  { day: 'Jan 29', h: 'h-12', active: false },
                  { day: 'Jan 30', h: 'h-10', active: false },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-neutral-100 rounded-t-md h-32 flex items-end overflow-hidden">
                      <div className={`w-full ${bar.h} transition-all duration-500 rounded-t-md ${
                        bar.active ? 'bg-neutral-900' : 'bg-neutral-400'
                      }`} />
                    </div>
                    <span className="text-[9px] font-bold text-neutral-400 leading-none">{bar.day.split(' ')[1]}</span>
                  </div>
                ))}
              </div>

              {/* Chart Legend */}
              <div className="flex gap-4 mt-4 text-[10px] font-semibold text-neutral-500 justify-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-neutral-900 rounded-sm" /> Full hours
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-neutral-400 rounded-sm" /> Reduced hours
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* SECTION 4: Leave Approval Card & Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Action Leave Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded-full border border-neutral-200">Sick Leave</span>
                <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-500 text-[10px] font-bold rounded-full border border-neutral-200">Pending</span>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <img className="w-9 h-9 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" alt="" />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Ralph Edwards</h4>
                  <p className="text-[10px] text-neutral-500 font-medium">Leave for 4 day(s)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Leave From:</span>
                  <p className="text-xs font-bold text-neutral-950 mt-0.5">Jan 23, 2024</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Leave To:</span>
                  <p className="text-xs font-bold text-neutral-950 mt-0.5">Jan 27, 2024</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-neutral-100">
              <button className="py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                Approve
              </button>
              <button className="py-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-all">
                Reject
              </button>
            </div>
          </div>

          {/* Quick Info summary card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-950">Brooklyn Simmons</h4>
                  <p className="text-[11px] text-neutral-500 font-medium">brok-simms@mail.com</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Department:</span>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">Design</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Job Title:</span>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">Creative Director</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
              <span>Contract Type:</span>
              <span className="font-bold text-neutral-900">Onsite - Fulltime</span>
            </div>
          </div>

          {/* Additional details */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover grayscale border border-neutral-200" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" alt="" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-950">Lisa Harvey</h4>
                  <p className="text-[11px] text-neutral-500 font-medium">helo-lisaa@hotmail.com</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Leave Request:</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">Annual Leave (2 days)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
              <span>Leave From:</span>
              <span className="font-bold text-neutral-900">Jan 12, 2024</span>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
