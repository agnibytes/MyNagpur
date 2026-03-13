const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Multilingual responses database
const responses = {
    greeting: {
        en: "Hello! I'm UMRED Mitra, your AI-powered civic assistant. How can I help you today?",
        hi: "नमस्ते! मैं UMRED मित्र हूं, आपका AI-संचालित नागरिक सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
        mr: "नमस्कार! मी UMRED मित्र आहे, तुमचा AI-चालित नागरिक सहाय्यक. आज मी तुमची कशी मदत करू शकतो?"
    },
    services: {
        en: "We offer the following services:\n• Property Tax Payment\n• Water Bill Payment\n• Birth/Death Certificates\n• Trade License\n• Building Permission\n• Grievance Registration\n\nWhich service would you like to know more about?",
        hi: "हम निम्नलिखित सेवाएं प्रदान करते हैं:\n• संपत्ति कर भुगतान\n• पानी बिल भुगतान\n• जन्म/मृत्यु प्रमाण पत्र\n• व्यापार लाइसेंस\n• भवन अनुमति\n• शिकायत पंजीकरण\n\nआप किस सेवा के बारे में अधिक जानना चाहते हैं?",
        mr: "आम्ही खालील सेवा देतो:\n• मालमत्ता कर भरणा\n• पाणी बिल भरणा\n• जन्म/मृत्यू दाखला\n• व्यापार परवाना\n• बांधकाम परवानगी\n• तक्रार नोंदणी\n\nतुम्हाला कोणत्या सेवेबद्दल अधिक माहिती हवी आहे?"
    },
    property_tax: {
        en: "📋 **Property Tax Information**\n\n• Due Date: 31st January 2026\n• Early Payment: 5% discount (30+ days before due)\n• Late Fee: 2% per month\n• Pay Online: /services/property-tax\n\nWould you like me to help you with payment?",
        hi: "📋 **संपत्ति कर जानकारी**\n\n• नियत तिथि: 31 जनवरी 2026\n• शीघ्र भुगतान: 5% छूट (नियत तिथि से 30+ दिन पहले)\n• विलंब शुल्क: 2% प्रति माह\n• ऑनलाइन भुगतान करें: /services/property-tax\n\nक्या आप चाहते हैं कि मैं भुगतान में आपकी मदद करूं?",
        mr: "📋 **मालमत्ता कर माहिती**\n\n• देय तारीख: 31 जानेवारी 2026\n• लवकर भरणा: 5% सूट (देय तारखेच्या 30+ दिवस आधी)\n• उशीरा शुल्क: 2% प्रति महिना\n• ऑनलाइन भरणा करा: /services/property-tax\n\nतुम्हाला भरणा करण्यात मदत हवी आहे का?"
    },
    water_bill: {
        en: "💧 **Water Bill Information**\n\n• Billing: Monthly\n• Rates: ₹5-25/KL based on consumption\n• Pay Online: /services/water-bill\n• Report Leakage: 1800-XXX-XXXX\n\nNeed help with your water bill?",
        hi: "💧 **पानी बिल जानकारी**\n\n• बिलिंग: मासिक\n• दरें: ₹5-25/KL उपभोग के आधार पर\n• ऑनलाइन भुगतान: /services/water-bill\n• रिसाव की रिपोर्ट करें: 1800-XXX-XXXX\n\nक्या आपको पानी बिल में मदद चाहिए?",
        mr: "💧 **पाणी बिल माहिती**\n\n• बिलिंग: मासिक\n• दर: वापरावर आधारित ₹5-25/KL\n• ऑनलाइन भरणा: /services/water-bill\n• गळती नोंदवा: 1800-XXX-XXXX\n\nतुम्हाला पाणी बिलासाठी मदत हवी आहे का?"
    },
    complaint: {
        en: "📢 **File a Grievance**\n\nYou can report civic issues like:\n• Road/Pothole problems\n• Water supply issues\n• Streetlight failures\n• Garbage collection\n• Drainage problems\n\nFile now: /services/complaints\n\nOur AI will automatically prioritize and route your complaint!",
        hi: "📢 **शिकायत दर्ज करें**\n\nआप नागरिक समस्याओं की रिपोर्ट कर सकते हैं जैसे:\n• सड़क/गड्ढे की समस्या\n• पानी आपूर्ति के मुद्दे\n• स्ट्रीटलाइट की विफलता\n• कचरा संग्रहण\n• जल निकासी की समस्या\n\nअभी दर्ज करें: /services/complaints\n\nहमारा AI स्वचालित रूप से आपकी शिकायत को प्राथमिकता देगा!",
        mr: "📢 **तक्रार दाखल करा**\n\nतुम्ही नागरिक समस्यांची तक्रार करू शकता जसे:\n• रस्ता/खड्डा समस्या\n• पाणी पुरवठा समस्या\n• रस्त्यावरील दिवे बंद\n• कचरा उचल\n• ड्रेनेज समस्या\n\nआत्ता दाखल करा: /services/complaints\n\nआमचे AI तुमच्या तक्रारीला आपोआप प्राधान्य देईल!"
    },
    certificates: {
        en: "📜 **Certificate Services**\n\n• Birth Certificate (7 days)\n• Death Certificate (7 days)\n• Marriage Certificate (15 days)\n• Domicile Certificate (21 days)\n• Income Certificate (14 days)\n\nApply at: /services/birth-certificate\n\nDocuments required: Aadhar, Address Proof",
        hi: "📜 **प्रमाण पत्र सेवाएं**\n\n• जन्म प्रमाण पत्र (7 दिन)\n• मृत्यु प्रमाण पत्र (7 दिन)\n• विवाह प्रमाण पत्र (15 दिन)\n• निवास प्रमाण पत्र (21 दिन)\n• आय प्रमाण पत्र (14 दिन)\n\nआवेदन करें: /services/birth-certificate\n\nआवश्यक दस्तावेज: आधार, पता प्रमाण",
        mr: "📜 **दाखला सेवा**\n\n• जन्म दाखला (7 दिवस)\n• मृत्यू दाखला (7 दिवस)\n• विवाह दाखला (15 दिवस)\n• अधिवास दाखला (21 दिवस)\n• उत्पन्न दाखला (14 दिवस)\n\nअर्ज करा: /services/birth-certificate\n\nआवश्यक कागदपत्रे: आधार, पत्ता पुरावा"
    },
    track: {
        en: "🔍 **Track Your Application**\n\nYou can track your application status at:\n/services/track-application\n\nEnter your application number (e.g., UNP-2026-000001) to check the current status.",
        hi: "🔍 **अपना आवेदन ट्रैक करें**\n\nआप यहां अपने आवेदन की स्थिति देख सकते हैं:\n/services/track-application\n\nवर्तमान स्थिति जांचने के लिए अपना आवेदन नंबर दर्ज करें।",
        mr: "🔍 **तुमचा अर्ज ट्रॅक करा**\n\nतुम्ही येथे तुमच्या अर्जाची स्थिती पाहू शकता:\n/services/track-application\n\nसध्याची स्थिती पाहण्यासाठी तुमचा अर्ज क्रमांक टाका."
    },
    contact: {
        en: "📞 **Contact Information**\n\n• Office: Nagpur Municipal Corporation, Main Road, Nagpur\n• Phone: 07118-XXXXXX\n• Toll-Free: 1800-XXX-XXXX\n• Email: contact@nagpurnp.gov.in\n• Hours: Mon-Sat, 10AM - 5PM",
        hi: "📞 **संपर्क जानकारी**\n\n• कार्यालय: उमरेड नगर परिषद, मुख्य मार्ग, उमरेड\n• फोन: 07118-XXXXXX\n• टोल-फ्री: 1800-XXX-XXXX\n• ईमेल: contact@nagpurnp.gov.in\n• समय: सोम-शनि, सुबह 10 - शाम 5",
        mr: "📞 **संपर्क माहिती**\n\n• कार्यालय: उमरेड नगर परिषद, मुख्य रस्ता, उमरेड\n• फोन: 07118-XXXXXX\n• टोल-फ्री: 1800-XXX-XXXX\n• ईमेल: contact@nagpurnp.gov.in\n• वेळ: सोम-शनि, सकाळी 10 - संध्याकाळी 5"
    },
    fallback: {
        en: "I'm not sure I understood that. You can ask me about:\n• Services we offer\n• Property Tax\n• Water Bill\n• Filing Complaints\n• Certificates\n• Track Application\n• Contact Information\n\nOr type 'help' for more options.",
        hi: "मुझे यकीन नहीं है कि मैंने समझा। आप मुझसे पूछ सकते हैं:\n• हमारी सेवाएं\n• संपत्ति कर\n• पानी बिल\n• शिकायत दर्ज करना\n• प्रमाण पत्र\n• आवेदन ट्रैक करें\n• संपर्क जानकारी\n\nया 'help' टाइप करें।",
        mr: "मला खात्री नाही की मला समजले. तुम्ही मला विचारू शकता:\n• आमच्या सेवा\n• मालमत्ता कर\n• पाणी बिल\n• तक्रार दाखल करणे\n• दाखले\n• अर्ज ट्रॅक करा\n• संपर्क माहिती\n\nकिंवा 'help' टाइप करा."
    }
};

// Intent detection
const detectIntent = (message) => {
    const msg = message.toLowerCase();

    // Greeting patterns
    if (/^(hi|hello|hey|namaste|नमस्ते|नमस्कार|good\s*(morning|afternoon|evening))/.test(msg)) {
        return 'greeting';
    }

    // Services
    if (/service|सेवा|सेवाएं|what can you do|help|मदद/.test(msg)) {
        return 'services';
    }

    // Property Tax
    if (/property\s*tax|संपत्ति\s*कर|मालमत्ता\s*कर|house\s*tax|ghar\s*kar/.test(msg)) {
        return 'property_tax';
    }

    // Water Bill
    if (/water\s*bill|पानी\s*बिल|पाणी\s*बिल|water\s*tax|pani/.test(msg)) {
        return 'water_bill';
    }

    // Complaints
    if (/complaint|grievance|शिकायत|तक्रार|problem|issue|report/.test(msg)) {
        return 'complaint';
    }

    // Certificates
    if (/certificate|birth|death|marriage|जन्म|मृत्यु|विवाह|दाखला|प्रमाण\s*पत्र/.test(msg)) {
        return 'certificates';
    }

    // Track
    if (/track|status|where\s*is|application|आवेदन|ट्रैक|अर्ज/.test(msg)) {
        return 'track';
    }

    // Contact
    if (/contact|phone|email|address|office|पता|कार्यालय|संपर्क/.test(msg)) {
        return 'contact';
    }

    return 'fallback';
};

// Detect language
const detectLanguage = (message) => {
    // Check for Devanagari script
    if (/[\u0900-\u097F]/.test(message)) {
        // Marathi-specific words
        if (/आहे|करा|हवी|तुमच|मला|काय/.test(message)) {
            return 'mr';
        }
        return 'hi';
    }
    return 'en';
};

// Quick action suggestions
const getQuickActions = (intent, lang) => {
    const actions = {
        greeting: [
            { label: lang === 'mr' ? 'सेवा' : lang === 'hi' ? 'सेवाएं' : 'Services', action: 'services' },
            { label: lang === 'mr' ? 'तक्रार' : lang === 'hi' ? 'शिकायत' : 'Complaint', action: 'complaint' },
            { label: lang === 'mr' ? 'संपर्क' : lang === 'hi' ? 'संपर्क' : 'Contact', action: 'contact' }
        ],
        services: [
            { label: lang === 'mr' ? 'मालमत्ता कर' : lang === 'hi' ? 'संपत्ति कर' : 'Property Tax', action: 'property_tax' },
            { label: lang === 'mr' ? 'पाणी बिल' : lang === 'hi' ? 'पानी बिल' : 'Water Bill', action: 'water_bill' },
            { label: lang === 'mr' ? 'तक्रार' : lang === 'hi' ? 'शिकायत' : 'Complaint', action: 'complaint' }
        ],
        property_tax: [
            { label: lang === 'mr' ? 'आता भरा' : lang === 'hi' ? 'अभी भुगतान करें' : 'Pay Now', link: '/services/property-tax' },
            { label: lang === 'mr' ? 'ट्रॅक करा' : lang === 'hi' ? 'ट्रैक करें' : 'Track', action: 'track' }
        ],
        water_bill: [
            { label: lang === 'mr' ? 'आता भरा' : lang === 'hi' ? 'अभी भुगतान करें' : 'Pay Now', link: '/services/water-bill' },
            { label: lang === 'mr' ? 'ट्रॅक करा' : lang === 'hi' ? 'ट्रैक करें' : 'Track', action: 'track' }
        ],
        complaint: [
            { label: lang === 'mr' ? 'तक्रार दाखल करा' : lang === 'hi' ? 'शिकायत दर्ज करें' : 'File Complaint', link: '/services/complaints' }
        ],
        fallback: [
            { label: lang === 'mr' ? 'सेवा' : lang === 'hi' ? 'सेवाएं' : 'Services', action: 'services' },
            { label: lang === 'mr' ? 'संपर्क' : lang === 'hi' ? 'संपर्क' : 'Contact', action: 'contact' }
        ]
    };
    return actions[intent] || actions.fallback;
};

// @route   POST /api/ai/chat
// @desc    Chat with UMRED Mitra AI
// @access  Public (auth optional)
router.post('/chat', optionalAuth, async (req, res) => {
    try {
        const { message, language: requestedLang, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Detect language from message or use requested
        const detectedLang = detectLanguage(message);
        const lang = requestedLang || detectedLang;

        // Detect intent
        const intent = detectIntent(message);

        // Get response
        const response = responses[intent]?.[lang] || responses[intent]?.en || responses.fallback[lang];

        // Get quick actions
        const quickActions = getQuickActions(intent, lang);

        res.json({
            response,
            intent,
            language: lang,
            quickActions,
            sessionId: sessionId || `session_${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...(req.user && { userName: req.user.name })
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/ai/suggested-questions
// @desc    Get suggested questions for a context
// @access  Public
router.get('/suggested-questions', (req, res) => {
    const { language = 'en' } = req.query;

    const suggestions = {
        en: [
            "What services do you offer?",
            "How do I pay property tax?",
            "I want to file a complaint",
            "Track my application",
            "Office contact details"
        ],
        hi: [
            "आप क्या सेवाएं देते हैं?",
            "संपत्ति कर कैसे भरूं?",
            "मैं शिकायत दर्ज करना चाहता हूं",
            "मेरा आवेदन ट्रैक करें",
            "कार्यालय संपर्क जानकारी"
        ],
        mr: [
            "तुम्ही कोणत्या सेवा देता?",
            "मालमत्ता कर कसा भरू?",
            "मला तक्रार दाखल करायची आहे",
            "माझा अर्ज ट्रॅक करा",
            "कार्यालय संपर्क माहिती"
        ]
    };

    res.json({
        suggestions: suggestions[language] || suggestions.en,
        language
    });
});

// @route   POST /api/ai/feedback
// @desc    Submit feedback on AI response
// @access  Public
router.post('/feedback', async (req, res) => {
    const { sessionId, messageId, rating, comment } = req.body;

    // In production, store this in database for model improvement
    console.log('AI Feedback:', { sessionId, messageId, rating, comment });

    res.json({
        success: true,
        message: 'Thank you for your feedback!'
    });
});

module.exports = router;
