const SortableLeadCard = ({ lead, onDealStageChange, onEngagementChange }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-xl p-4 mb-4 shadow-sm bg-white"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Left column: text info */}
        <div>
          <div className="font-semibold text-lg">{lead.company}</div>
          <div className="text-sm text-gray-700">{lead.name} – {lead.title}</div>
          <div className="text-sm text-gray-500">{lead.email}</div>
          <div className="text-sm text-gray-500">{lead.country}</div>
        </div>

        {/* Right column: dropdowns + source */}
        <div className="flex flex-col gap-2 justify-center items-start">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Stage:</span>
            <DealStageDropdown
              leadId={lead.id}
              currentStage={lead.current_stage}
              onStageChange={onDealStageChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Engagement:</span>
            <EngagementDropdown
              leadId={lead.id}
              currentEngagement={lead.engagement}
              onEngagementChange={onEngagementChange}
            />
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Source: <span className="font-medium">{lead.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};