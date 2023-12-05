import React, { useState } from 'react';
const AccordionItem = ({ title, content, isOpen, onToggle, children }) => (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
        <div className="accordion-header" onClick={onToggle}>
            <h3>{title}</h3>
            <span className={`icon ${isOpen ? 'open' : ''}`}>&#9660;</span>
        </div>
        {isOpen && (
            <div className="accordion-content">
                {content}
                {children && children}
            </div>
        )}
    </div>
);

const CustomAccordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="custom-accordion">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={index === openIndex}
                    onToggle={() => handleToggle(index)}
                >
                    {item.children && <CustomAccordion items={item.children} />}
                </AccordionItem>
            ))}
        </div>
    );
};

// Example usage:
const accordionItems = [
    {
        title: 'World',
        children: [
            {
                title: 'Countries',
                children: [
                    {
                        title: 'India',
                        children: [
                            {
                                title: 'Telangana',
                                children: [
                                    {
                                        title: 'Hyderabad',
                                        children: [
                                            { title: 'Banjara Hills' },
                                            { title: 'Yusfguda' },
                                        ],
                                    },
                                    {
                                        title: 'Warangal',
                                        children: [
                                            { title: 'Narsampet' },
                                            { title: 'Nekkonda' },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: 'Andhra Pradesh',
                                children: [
                                    { title: 'Visakhapatnam' },
                                    { title: 'Vijayawada' },
                                ],
                            },
                        ],
                    },
                    {
                        title: 'US',
                        children: [
                            { title: 'New York' },
                            { title: 'Washington' },
                        ],
                    },
                ],
            },
        ],
    },
];


const App = () => {
    return (
        <div>
            <h1>Accordion </h1>
            <CustomAccordion items={accordionItems} />
        </div>
    );
};

export default App;
