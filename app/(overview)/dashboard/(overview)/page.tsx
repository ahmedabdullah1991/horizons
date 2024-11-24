import {ReusableCard} from "@/components/components";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BarChart, CalendarDays, Users} from "lucide-react";
import {Progress} from "@/components/ui/progress";

const CompanyDashboard = async () =>  {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReusableCard
                    className="col-span-1 md:col-span-2 lg:col-span-3"
                    title="Company Overview"
                    description="Key metrics and information"
                    content="remove"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center">
                            <Users className="h-8 w-8 text-blue-500 mb-2" />
                            <p className="text-2xl font-bold">1,234</p>
                            <p className="text-sm text-gray-500">Total Employees</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <BarChart className="h-8 w-8 text-green-500 mb-2" />
                            <p className="text-2xl font-bold">$10.5M</p>
                            <p className="text-sm text-gray-500">Revenue (Q2)</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <CalendarDays className="h-8 w-8 text-purple-500 mb-2" />
                            <p className="text-2xl font-bold">98%</p>
                            <p className="text-sm text-gray-500">Attendance Rate</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Users className="h-8 w-8 text-orange-500 mb-2" />
                            <p className="text-2xl font-bold">4.7</p>
                            <p className="text-sm text-gray-500">Employee Satisfaction</p>
                        </div>
                    </div>
                </ReusableCard>

                <ReusableCard
                    title="Recent Hires"
                    description="New employees in the last 30 days"
                    footer="remove"
                >
                    <div className="space-y-4">
                        {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={name} />
                                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{name}</p>
                                    <p className="text-sm text-gray-500">Joined {30 - index * 7} days ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ReusableCard>

                <ReusableCard
                    title="Employee Statistics"
                    description="Current workforce composition"
                    footer="remove"
                >
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Full-time (75%)</span>
                                <span className="text-sm font-medium">75/100</span>
                            </div>
                            <Progress value={75} className="w-full" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Part-time (20%)</span>
                                <span className="text-sm font-medium">20/100</span>
                            </div>
                            <Progress value={20} className="w-full" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Contractors (5%)</span>
                                <span className="text-sm font-medium">5/100</span>
                            </div>
                            <Progress value={5} className="w-full" />
                        </div>
                    </div>
                </ReusableCard>

                <ReusableCard
                    title="Departments Overview"
                    description="Employee distribution by department"
                    footer="remove"
                >
                    <div className="space-y-4">
                        {[
                            { name: 'Engineering', count: 50, color: 'bg-blue-500' },
                            { name: 'Marketing', count: 30, color: 'bg-green-500' },
                            { name: 'Sales', count: 25, color: 'bg-yellow-500' },
                            { name: 'HR', count: 15, color: 'bg-purple-500' },
                        ].map((dept, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className={`w-4 h-4 rounded-full ${dept.color}`}></div>
                                <div className="flex-1">
                                    <p className="font-medium">{dept.name}</p>
                                    <p className="text-sm text-gray-500">{dept.count} employees</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ReusableCard>

                <ReusableCard
                    title="Upcoming Events"
                    description="Next 30 days"
                    content="remove"
                >
                    <div className="space-y-4">
                        {[
                            { name: 'Quarterly Review', date: 'May 15, 2024' },
                            { name: 'Team Building Workshop', date: 'May 22, 2024' },
                            { name: 'New Product Launch', date: 'June 1, 2024' },
                        ].map((event, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p className="font-medium">{event.name}</p>
                                <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </ReusableCard>
            </div>
        </div>
    )
}

export default CompanyDashboard
