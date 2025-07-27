import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Activity
} from 'lucide-react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { useAuth } from '../contexts/AuthContext';

// const monthlyData = [
//   { month: 'Jan', detections: 45, savings: 125000 },
//   { month: 'Feb', detections: 52, savings: 145000 },
//   { month: 'Mar', detections: 38, savings: 98000 },
//   { month: 'Apr', detections: 61, savings: 172000 },
//   { month: 'May', detections: 55, savings: 158000 },
//   { month: 'Jun', detections: 67, savings: 189000 },
// ];

// Background image path
import bgImage from '../assets/bg.jpeg'; // Adjust this path to match your file structure


const fraudTypes = [
  { name: 'Prescription Shopping', value: 35, color: '#EF4444' },
  { name: 'Doctor Shopping', value: 28, color: '#F97316' },
  { name: 'Forged Prescriptions', value: 22, color: '#EAB308' },
  { name: 'Overprescribing', value: 15, color: '#10B981' },
];

export default function Dashboard() {
    // const { fraudResults } = useAuth();
    
    // Calculate real-time stats from fraud results
    // ✅ Fixed Sample Data
    const totalDetections = 214;
    const activeAlerts = 12;
    const highRiskCases = 38;
    const avgRiskScore = 76;

    // Get recent alerts from fraud results
    const recentAlerts = [
    {
      id: 1,
      type: 'Prescription Shopping',
      description: 'Multiple high-strength prescriptions requested in a short span.',
      time: '2 minutes ago',
      severity: 'high',
    },
    {
      id: 2,
      type: 'Doctor Shopping',
      description: 'Patient visited 4 doctors in 5 days.',
      time: '5 minutes ago',
      severity: 'medium',
    },
    {
      id: 3,
      type: 'Forged Prescriptions',
      description: 'Suspicious handwriting detected on uploaded prescription.',
      time: '9 minutes ago',
      severity: 'high',
    },
  ];

  const stats = [
    {
      title: 'Total Detections',
      value: totalDetections.toString(),
      change: '+4%',
      trend: 'up',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'High Risk Cases',
      value: highRiskCases.toString(),
      change: '+3%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Active Alerts',
      value: activeAlerts.toString(),
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Avg Risk Score',
      value: `${avgRiskScore}%`,
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    }
  ];

  return (
      <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem', // Add padding so content isn't flush to edges
      }}
    >
    <div className="space-y-6">
      {/* Header */}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fraud Detection Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and analyze prescription fraud patterns in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">System Active</span>
          </div>
        </div>
      </div>

      <div className="space-y-10 px-4 sm:px-10 lg:px-8">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 
                      hover:shadow-lg hover:border-blue-500 hover:scale-105 
                      transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1"></span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fraud Types Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 
                  w-full max-w-2xl mx-auto 
                  hover:shadow-lg hover:border-blue-500 hover:scale-[1.02] 
                  transition-all duration-300 ease-in-out cursor-pointer"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Types Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fraudTypes}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {fraudTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {fraudTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: type.color }}
                ></div>
                <span className="text-sm text-gray-600">{type.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{type.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>


      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Trends */}
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Detection Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="detections" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div> */}

        {/* Fraud Types */}
        {/* <div className="flex justify-center items-center w-full">
          <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 300 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fraudTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {fraudTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {fraudTypes.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{type.value}%</span>
              </div>
            ))}
            </div>
          </motion.div>
        </div> */}
      </div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Fraud Alerts</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-900 mt-1">{alert.description}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Investigate
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
    </div>
  );
}