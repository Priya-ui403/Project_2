import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
// Background image path
import bgImage from '../assets/bg.jpeg'; // Adjust this path to match your file structure

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Simulate form submission
    alert('Thank you for your message! Our team will get back to you within 24 hours.');
    reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@prescriptionfraud.ai',
      description: 'Get help with technical issues and general inquiries'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+91 (555) 123-4567',
      description: 'Available Monday - Friday, 9 AM - 6 PM IST'
    },
    {
      icon: MapPin,
      title: 'Headquarter',
      details: 'CodeCrakers',
      description: 'IIT ROORKEE - Roorkee, Uttarakhand, India (247667)'
    },
    {
      icon: Clock,
      title: 'Emergency Support',
      details: '24/7 Available',
      description: 'Critical fraud alerts and system issues'
    }
  ];

  const supportCategories = [
    {
      icon: MessageSquare,
      title: 'General Inquiries',
      description: 'Questions about our platform, pricing, or features'
    },
    {
      icon: HeadphonesIcon,
      title: 'Technical Support',
      description: 'Help with system issues, integrations, or troubleshooting'
    },
    {
      icon: Phone,
      title: 'Sales & Demos',
      description: 'Schedule a demo or discuss enterprise solutions'
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our team is here to help you with any questions about Prescription Fraud. 
          Reach out for support, demos, or partnership opportunities.
        </p>
      </motion.div>

      {/* Contact Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {contactInfo.map((info) => (
          <div key={info.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <info.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
            <p className="text-blue-600 font-medium mb-1">{info.details}</p>
            <p className="text-sm text-gray-600">{info.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="dr_abc@hospital.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  {...register('organization')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City General Hospital"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  {...register('urgency')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low - General Inquiry</option>
                  <option value="medium">Medium - Technical Issue</option>
                  <option value="high">High - Urgent Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                {...register('subject', { required: 'Subject is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                rows={6}
                {...register('message', { required: 'Message is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide detailed information about your inquiry..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Categories</h3>
            <div className="space-y-4">
              {supportCategories.map((category) => (
                <div key={category.title} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <category.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Response Times</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-800">High Priority:</span>
                <span className="font-medium text-blue-900">&lt; 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Medium Priority:</span>
                <span className="font-medium text-blue-900">&lt; 8 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Low Priority:</span>
                <span className="font-medium text-blue-900">&lt; 24 hours</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Emergency Support</h3>
            <p className="text-sm text-green-800 mb-4">
              For critical system issues or urgent fraud alerts that require immediate attention.
            </p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
              Call Emergency Line
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
}