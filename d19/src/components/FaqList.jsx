
import FaqItem from "./FaqItem";

function FaqList({ faqData, onSelectFaq, selectedFaq }) {
  return (
    <div>
      {faqData.length > 0 ? (
        faqData.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            onSelectFaq={onSelectFaq}
            isSelected={selectedFaq === faq.id}
          />
        ))
      ) : (
        <p className="bg-white p-6 rounded-lg text-gray-500 text-center">
          Không có câu hỏi nào.
        </p>
      )}
    </div>
  );
}

export default FaqList;
