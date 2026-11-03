
function FaqItem({ faq, onSelectFaq, isSelected }) {
  return (
    <div className="bg-white shadow mb-4 rounded-xl overflow-hidden">
      <div
        onClick={() => onSelectFaq(faq.id)}
        className="flex justify-between items-center p-5 cursor-pointer"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 text-sm">
              {faq.category}
            </span>

            {faq.isHot && (
              <span className="bg-red-100 px-2 py-1 rounded-full font-bold text-red-600 text-xs">
                Hot
              </span>
            )}
          </div>

          <h2 className="font-semibold text-lg">
            {faq.question}
          </h2>
        </div>

        <span className="text-2xl">
          {isSelected ? "−" : "+"}
        </span>
      </div>

      {isSelected && (
        <div className="p-5 border-gray-200 border-t text-gray-600">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default FaqItem;
