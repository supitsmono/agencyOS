
export const mockApplications = [
    {
        id: "1",
        name: "Elena Rossi",
        category: "gold",
        gender: "Female",
        age: "19",
        email: "elena.r@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        status: "new",
        appliedAt: "2 hours ago",
        timestamp: Date.now() - 7200000,
        height: "178cm",
        location: "Milan, Italy",
        instagram: "@elena.rossi",
        phone: "+39 333 555 0192",
        folder: "inbox",
        subject: "represented by none",
        message: "Hi! I am a 19 year old model based in Milan. I have executed 3 editorials for local magazines and I am looking for international representation.",
        stats: {
            height: "178cm",
            bust: "82cm",
            waist: "60cm",
            hips: "89cm",
            "Dress Size": "36",
            shoes: "39",
            eyes: "Green",
            hair: "Brown"
        },
        chat: [
            { id: 1, user: "Sarah (Head Booker)", text: "She has a great look for the Armani campaign. Height is perfect.", time: "2h ago", avatar: "https://i.pravatar.cc/150?u=sarah" },
            { id: 2, user: "Mike (Scout)", text: "Agreed. Her portfolio needs a bit more variety though.", time: "1h ago", avatar: "https://i.pravatar.cc/150?u=mike" }
        ],
        images: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop"
        ]
    },
    {
        id: "2",
        name: "Sarah Jenkins",
        category: "silver",
        gender: "Female",
        age: "23",
        email: "sarah.j@example.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
        status: "shortlist",
        appliedAt: "Yesterday",
        timestamp: Date.now() - 86400000,
        height: "175cm",
        location: "London, UK",
        instagram: "@sarah.jenkins",
        phone: "+44 7700 900077",
        folder: "inbox",
        subject: "New Face Application",
        message: "Hello AgencyOS Team. I'm Sarah from London. I've been following your agency for years. I am currently unsigned.",
        stats: {
            height: "175cm",
            bust: "85cm",
            waist: "62cm",
            hips: "90cm",
            "Dress Size": "38",
            shoes: "38",
            eyes: "Blue",
            hair: "Blonde"
        },
        images: [
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop"
        ],
        chat: [
            { id: 1, user: "Tom (Director)", text: "Gorgeous eyes. Let's bring her in for a polaroid session.", time: "1d ago", avatar: "https://i.pravatar.cc/150?u=tom" }
        ]
    },
    {
        id: "3",
        name: "Michael Chen",
        category: "bronze",
        gender: "Male",
        age: "26",
        email: "m.chen@example.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        status: "new",
        appliedAt: "2 days ago",
        timestamp: Date.now() - 172800000,
        height: "185cm",
        location: "New York, USA",
        folder: "inbox",
        subject: "Commercial Model Inquiry",
        message: "Experienced commercial model seeking new representation in the NY market.",
        stats: {
            height: "185cm",
            chest: "98cm",
            waist: "78cm",
            shoes: "44",
            eyes: "Brown",
            hair: "Black"
        },
        images: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop"
        ],
        chat: []
    },
    {
        id: "4",
        name: "David Miller",
        gender: "Male",
        age: "24",
        email: "david.m@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        status: "contacted",
        appliedAt: "3 days ago",
        timestamp: Date.now() - 259200000,
        height: "182cm",
        location: "Berlin, Germany",
        folder: "inbox",
        subject: "Representation Inquiry",
        message: "Following up on my previous application.",
        stats: { height: "182cm", eyes: "Blue", hair: "Blonde" },
        images: [], chat: []
    },
    {
        id: "5",
        name: "Emma Wilson",
        gender: "Female",
        age: "21",
        email: "emma.w@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        status: "archived",
        appliedAt: "1 week ago",
        timestamp: Date.now() - 604800000,
        height: "176cm",
        location: "Paris, France",
        folder: "archived",
        subject: "Model Application",
        message: "Interested in joining your agency.",
        stats: { height: "176cm", eyes: "Brown", hair: "Black" },
        images: [], chat: []
    },
    {
        id: "6",
        name: "James Bond",
        gender: "Male",
        age: "30",
        email: "james.b@example.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        status: "rejected",
        appliedAt: "1 month ago",
        timestamp: Date.now() - 2592000000,
        height: "188cm",
        location: "London, UK",
        folder: "trash",
        subject: "007 Reporting",
        message: "Do you need a spy?",
        stats: { height: "188cm", eyes: "Blue", hair: "Black" },
        images: [], chat: []
    }
]
