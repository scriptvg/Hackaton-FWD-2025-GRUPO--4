import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

function TabsContainer({
  tabs,
  defaultValue,
  className = "flex flex-col w-full",
  tabListClassName = "overflow-x-auto overflow-y-hidden -mx-4 px-4 sm:overflow-visible sm:-mx-0 sm:px-0 flex whitespace-nowrap space-x-4 pb-2 mb-6 border-b border-gray-300 text-gray-500 justify-center md:justify-start",
  tabTriggerClassName = "flex-shrink-0 relative text-gray-700 font-semibold px-4 py-2 hover:text-teal-600 transition-all text-sm md:text-base data-[state=active]:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
}) {
  if (!tabs || tabs.length === 0) {
    return <div className="p-6 text-center text-gray-500">No hay pestañas disponibles</div>;
  }

  const firstTabValue = defaultValue || tabs[0].value;

  return (
    <Tabs.Root defaultValue={firstTabValue} className={className}>
      {/* Tab list — scrollable on mobile */}
      <Tabs.List
        role="tablist"
        aria-label="Secciones de Transparencia"
        className={tabListClassName}
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={tabTriggerClassName}
          >
            {tab.label}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full 
                         data-[state=inactive]:bg-transparent transition-all duration-300"
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Panels */}
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          {tab.component}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

export default TabsContainer;
