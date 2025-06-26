import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 0,
      question: 'How long does each car wash service take?',
      answer: `Our service times vary by package:\n\n• Basic Wash: 10-15 minutes\n• Premium Detail: 20-25 minutes\n• Luxury Spa: 35-40 minutes\n\nWe pride ourselves on efficiency without compromising quality. Most customers are surprised by how quickly we can deliver professional results.`,
      category: 'Service',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 1,
      question: 'What makes your car wash eco-friendly?',
      answer: `We're committed to environmental responsibility:\n\n• Use 80% less water than home washing\n• Biodegradable, non-toxic cleaning products\n• Water recycling and filtration systems\n• Proper wastewater treatment\n• Compliant with California environmental regulations\n\nOur eco-friendly approach helps protect California's precious water resources while delivering superior results.`,
      category: 'Environment',
      videoUrl: null
    },
    {
      id: 2,
      question: 'Do you offer membership or subscription plans?',
      answer: `Yes! Our membership plans offer significant savings:\n\n• Monthly plans: Save up to 20% per wash\n• Annual plans: Save up to 31% per wash\n• Priority booking for members\n• Exclusive promotions and upgrades\n• Flexible plans - pause or cancel anytime\n\nMemberships are perfect for regular customers who want consistent savings and convenience.`,
      category: 'Pricing',
      videoUrl: null
    },
    {
      id: 3,
      question: 'What happens if I\'m not satisfied with the service?',
      answer: `We stand behind our work with a 100% satisfaction guarantee:\n\n• If you're not completely happy, we'll redo the service for free\n• Still not satisfied? We'll provide a full refund\n• No questions asked policy\n• Our goal is your complete satisfaction\n\nWe've maintained a 4.8+ star rating because we make things right when they go wrong.`,
      category: 'Guarantee',
      videoUrl: null
    },
    {
      id: 4,
      question: 'Can I wait while my car is being washed?',
      answer: `Absolutely! We provide comfortable waiting areas:\n\n• Climate-controlled waiting lounges\n• Complimentary WiFi\n• Coffee and refreshments\n• Comfortable seating\n• Real-time service updates\n• Some locations offer additional amenities\n\nMany customers use the time to catch up on emails, make calls, or simply relax.`,
      category: 'Service',
      videoUrl: null
    },
    {
      id: 5,
      question: 'Do you wash cars in bad weather?',
      answer: `Yes, we operate in most weather conditions:\n\n• Indoor facilities protect from rain and wind\n• Climate-controlled environment\n• Service continues during light rain\n• May pause during severe weather for safety\n• We'll contact you if appointments need rescheduling\n\nOur indoor facilities mean your car gets cleaned regardless of California's occasional weather surprises.`,
      category: 'Service',
      videoUrl: null
    },
    {
      id: 6,
      question: 'What payment methods do you accept?',
      answer: `We accept all major payment methods:\n\n• Credit cards (Visa, MasterCard, American Express, Discover)\n• Debit cards\n• Mobile payments (Apple Pay, Google Pay)\n• Cash at most locations\n• Membership auto-pay options\n• Corporate accounts available\n\nPayment is processed securely and you'll receive a receipt via email.`,category: 'Payment',
      videoUrl: null
    },
    {
      id: 7,
      question: 'Do you offer services for large vehicles or fleets?',
      answer: `Yes, we accommodate vehicles of all sizes:\n\n• Trucks, SUVs, and vans welcome\n• Fleet services for businesses\n• Volume discounts available\n• Scheduled service programs\n• Corporate billing options\n• Specialized equipment for larger vehicles\n\nContact us for custom fleet pricing and scheduling options.`,
      category: 'Service',
      videoUrl: null
    }
  ];

  const categories = ['All', 'Service', 'Pricing', 'Environment', 'Guarantee', 'Payment'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? -1 : id);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get answers to common questions about our car wash services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-surface text-text-secondary hover:bg-primary-50 hover:text-primary border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      faq.category === 'Service' ? 'bg-primary-100 text-primary' :
                      faq.category === 'Pricing' ? 'bg-accent-100 text-accent' :
                      faq.category === 'Environment' ? 'bg-success-100 text-success' :
                      faq.category === 'Guarantee'? 'bg-warning-100 text-warning' : 'bg-surface-200 text-text-secondary'
                    }`}>
                      {faq.category}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <Icon
                      name={openFAQ === faq.id ? "ChevronUp" : "ChevronDown"}
                      size={24}
                      color="var(--color-text-secondary)"
                      className="transition-transform duration-200"
                    />
                  </div>
                </button>

                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                      
                      {faq.videoUrl && (
                        <div className="mt-6">
                          <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="flex items-center space-x-3 mb-3">
                              <Icon name="Play" size={20} color="var(--color-primary)" />
                              <span className="font-semibold text-text-primary">Watch Video Explanation</span>
                            </div>
                            <div className="aspect-video bg-surface rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <Icon name="Play" size={48} color="var(--color-text-secondary)" className="mx-auto mb-2" />
                                <p className="text-text-secondary">Video explanation available</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Still Have Questions?
              </h3>
              <p className="text-text-secondary mb-6">
                Our friendly customer service team is here to help you with any questions or concerns.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+1-555-CAR-WASH"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Phone" size={20} />
                  <span>Call (555) CAR-WASH</span>
                </a>
                <a
                  href="mailto:support@californiacarwash.com"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-background text-primary border border-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Icon name="Mail" size={20} />
                  <span>Email Support</span>
                </a>
              </div>
              
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Mon-Fri: 7AM-7PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageSquare" size={16} />
                  <span>Average response: 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;