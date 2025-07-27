import { motion } from 'framer-motion';
// import { Shield, Brain, Eye, Users, Award, Lock } from 'lucide-react';
import { Brain, Eye, Users } from 'lucide-react';
// Background image path
import bgImage from '../assets/bg.jpeg'; // Adjust this path to match your file structure

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Detection',
      description: 'Our machine learning algorithms analyze patterns across millions of prescriptions to identify potential fraud with 99.2% accuracy.'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Continuous surveillance of prescription data with instant alerts when suspicious activities are detected.'
    },
    // {
    //   icon: Shield,
    //   title: 'HIPAA Compliant',
    //   description: 'Complete compliance with healthcare regulations ensuring patient privacy and data security at all times.'
    // },
    {
      icon: Users,
      title: 'Multi-stakeholder Platform',
      description: 'Designed for healthcare providers, insurance companies, pharmacies, and regulatory bodies to work together.'
    }
    // {
    //   icon: Award,
    //   title: 'Proven Results',
    //   description: 'Successfully detected over 15,000 fraud cases, saving healthcare organizations millions in fraudulent claims.'
    // },
    // {
    //   icon: Lock,
    //   title: 'Secure Architecture',
    //   description: 'Enterprise-grade security with end-to-end encryption and secure cloud infrastructure.'
    // }
  ];

  // const stats = [
  //   { label: 'Fraud Cases Detected', value: '15,000+' },
  //   { label: 'Healthcare Partners', value: '500+' },
  //   { label: 'Accuracy Rate', value: '99.2%' },
  //   { label: 'Cost Savings Generated', value: '$50M+' },
  //   { label: 'Prescriptions Analyzed', value: '10M+' },
  //   { label: 'Years of Experience', value: '8+' }
  // ];

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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Prescription Fraud</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leading the fight against prescription fraud with advanced artificial intelligence 
          and machine learning technologies.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          To protect patients and healthcare organizations from prescription fraud through 
          innovative AI-powered detection systems. We believe that by leveraging cutting-edge 
          technology, we can create a safer, more secure healthcare ecosystem for everyone.
        </p>
      </motion.div>

      {/* Stats Grid */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Impact by the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Collection</h3>
            <p className="text-gray-600">
              Securely collect and process prescription data from healthcare providers, 
              pharmacies, and insurance systems.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms analyze patterns, anomalies, and 
              suspicious behaviors in real-time.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Alert & Action</h3>
            <p className="text-gray-600">
              Generate instant alerts for potential fraud cases with detailed reports 
              for investigation and action.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Technologies</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• React.js with TypeScript for type-safe development</li>
              <li>• Tailwind CSS for responsive design</li>
              <li>• Framer Motion for smooth animations</li>
              <li>• Recharts for data visualization</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Technologies</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Node.js with Express.js framework</li>
              <li>• MongoDB for scalable data storage</li>
              <li>• Python with scikit-learn for ML models</li>
              <li>• TensorFlow for deep learning algorithms</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Security & Compliance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Security & Compliance</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• End-to-end encryption for all data transmission</li>
              {/* <li>• SOC 2 Type II certified infrastructure</li> */}
              <li>• Regular security audits and penetration testing</li>
              <li>• Zero-trust security architecture</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Compliance</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• HIPAA compliant data handling</li>
              {/* <li>• GDPR compliance for international users</li> */}
              <li>• FDA guidelines for healthcare software</li>
              <li>• State and federal prescription monitoring</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  );
}