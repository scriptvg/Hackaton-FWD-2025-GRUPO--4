// src/components/MarineExhibit.jsx

import * as Tabs from '@radix-ui/react-tabs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function MarineExhibit({ data, onButtonClick }) {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <Tabs.Root defaultValue={data[0].value}>
        <Tabs.List className="flex flex-wrap gap-4 border-b border-gray-200 mb-4 text-gray-600">
          {data.map((item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              className="py-2 px-3 text-sm font-medium hover:text-teal-600 data-[state=active]:text-teal-600 border-b-2 border-transparent data-[state=active]:border-teal-600 transition-colors cursor-pointer"
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {data.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <Section
              title={item.title}
              descriptions={item.descriptions}
              title_facts={item.title_facts}
              facts={item.facts}
              images={item.images}
              buttons={item.buttons}
              item={item}
              onButtonClick={onButtonClick}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

function Section({ title, descriptions, title_facts, facts, images, buttons, item, onButtonClick }) {
  const imgs = Array.isArray(images) ? images : [images];

  const handleButtonClick = (btn) => {
    if (onButtonClick) {
      onButtonClick(btn, item);
    } else if (btn.onClick) {
      btn.onClick();
    } else if (btn.link) {
      window.open(btn.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image or Carousel */}
      <div className="flex-1 rounded-md border border-gray-300 overflow-hidden h-[100%]">
        <div className="aspect-[16/9] bg-gray-100">
          {imgs.length > 1 ? (
            <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
              {imgs.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`${title} - Image ${index + 1}`}
                    className="object-cover w-full h-100"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              src={imgs[0]}
              alt={title}
              className="object-cover w-full h-100"
            />
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1 space-y-4 text-gray-700">
        <h2 className="text-2xl font-semibold text-teal-700">{title}</h2>
        {descriptions?.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}

        {/* Datos interesantes */}
        <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold text-teal-700 mb-2 text-xl">{title_facts || "Datos interesantes:"}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {facts?.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* Buttons (solo si hay buttons definidos) */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleButtonClick(btn)}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors text-center cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
