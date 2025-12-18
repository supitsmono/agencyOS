/**
 * Intake Form Content Configuration
 * Single source of truth for application form copy.
 * 
 * Rules:
 * - Neutral tone (no "Join us!", "Apply now!")
 * - Clear compliance instructions
 * - No promises of review
 */

export const INTAKE_COPY = {
    general: {
        title: "Model Application",
        description: "Please complete all required fields accurately. Incomplete applications are automatically filtered.",
        submitButton: "Submit Application"
    },
    board: {
        label: "Select Board",
        helperText: "Choose the category that best fits your profile. Mismatched selections may result in automatic filtering.",
        options: {
            main: "Mainboard (Established)",
            new_faces: "New Faces (Development)",
            men: "Men",
            curve: "Curve"
        }
    },
    stats: {
        label: "Measurements & Details",
        helperText: "Ensure measurements are current (cm) and accurate. Misrepresentation will void the application.",
        heightPlaceholder: "Height (cm)",
        agePlaceholder: "Age (Years)",
        locationPlaceholder: "City, Country"
    },
    media: {
        label: "Digital Polariods",
        helperText: "Upload exactly 4 natural light photos: Headshot, Profile, Full Body, 3/4. No signup/filters allowed.",
        requirement: "Minimum 4 images required."
    },
    representation: {
        label: "Current Representation",
        helperText: "Are you currently signed with another agency? Transparency is required.",
        options: {
            signed: "Signed (Exclusive)",
            mother_agent: "Mother Agent Only",
            freelance: "Freelance / Unsigned"
        }
    }
};
