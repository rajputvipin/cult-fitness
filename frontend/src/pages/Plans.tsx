import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Removed import of plans from mockData
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext provides auth token

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Plans: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with actual auth token retrieval logic
  const authToken = ''; // Placeholder, replace with context or other auth method

  React.useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/workout/plans', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching plans: ${response.statusText}`);
        }
        const data = await response.json();
        setPlans(data.workoutPlans || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchPlans();
    } else {
      setLoading(false);
      setPlans([]);
    }
  }, [authToken]);

  const handlePlanSelect = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);
    
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Razorpay integration
    const selected = plans.find(p => p.id === planId);
    const _options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key
      amount: selected ? selected.price : 0,
      currency: 'INR',
      name: 'Cult Fitness',
      description: 'Fitness Plan Subscription',
      handler: function(response: unknown) {
        const res = response as { razorpay_payment_id?: string };
        alert(`Payment successful! Payment ID: ${res.razorpay_payment_id}`);
        setIsProcessing(false);
        setSelectedPlan(null);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#8B5CF6'
      }
    };

    const rzp = new window.Razorpay(_options);
    rzp.open();
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading plans...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Choose Your Plan
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Select the perfect plan to transform your fitness journey with personalized training, nutrition guidance, and expert support.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-cyan-900/20' 
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold text-white">{plan.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                    <span className="text-gray-300 text-lg">/{plan.duration}</span>
                  </div>
                  <p className="text-gray-300">{plan.duration} access to all features</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature:string, featureIndex:number) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isProcessing && selectedPlan === plan.id}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Choose ${plan.name}`
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Compare Plans</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what's included in each plan and choose the one that fits your needs.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700/50">
                    <th className="px-6 py-4 text-left text-white font-semibold">Features</th>
                    <th className="px-6 py-4 text-center text-white font-semibold">Basic</th>
                    <th className="px-6 py-4 text-center text-white font-semibold">Premium</th>
                    <th className="px-6 py-4 text-center text-white font-semibold">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {[
                    { feature: 'Basic workout plans', basic: true, premium: true, elite: true },
                    { feature: 'Mobile app access', basic: true, premium: true, elite: true },
                    { feature: 'Progress tracking', basic: true, premium: true, elite: true },
                    { feature: 'Personalized workout plans', basic: false, premium: true, elite: true },
                    { feature: 'Diet planning', basic: false, premium: true, elite: true },
                    { feature: 'Video tutorials', basic: false, premium: true, elite: true },
                    { feature: 'Personal trainer sessions', basic: false, premium: false, elite: true },
                    { feature: 'Custom nutrition plans', basic: false, premium: false, elite: true },
                    { feature: 'One-on-one consultations', basic: false, premium: false, elite: true },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-700/30 transition-colors duration-200">
                      <td className="px-6 py-4 text-gray-300">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.basic ? (
                          <CheckIcon className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.premium ? (
                          <CheckIcon className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.elite ? (
                          <CheckIcon className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
              },
              {
                question: 'Is there a free trial available?',
                answer: 'We offer a 7-day free trial for all our premium plans. You can try all features risk-free.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.'
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes, you can change your plan at any time. Changes will take effect immediately, and billing will be adjusted accordingly.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of members who have already started their fitness journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Plans;