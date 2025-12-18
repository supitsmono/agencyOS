/**
 * Board Profiles Configuration
 * Single source of truth for Agency Boards.
 * 
 * Rules:
 * - Presets only (no database configuration for v1)
 * - Used for AI routing and UI filtering
 */

export const BOARDS = {
    MAIN: "Main",
    NEW_FACES: "New Faces",
    MEN: "Men",
    CURVE: "Curve"
};

export const BOARD_PRESETS = {
    [BOARDS.MAIN]: {
        label: "Mainboard",
        description: "Established talent and high-potential new faces.",
        constraints: {
            minHeight: 174, // cm
            maxHeight: 181,
            minAge: 16,
            maxAge: 26,
            gender: ["Female", "Non-Binary"]
        }
    },
    [BOARDS.NEW_FACES]: {
        label: "New Faces",
        description: "Development/Scouting board for fresh talent.",
        constraints: {
            minHeight: 172,
            maxHeight: 183,
            minAge: 14, // strict legal checks elsewhere
            maxAge: 22,
            gender: ["Female", "Non-Binary"]
        }
    },
    [BOARDS.MEN]: {
        label: "Men",
        description: "Male models board.",
        constraints: {
            minHeight: 183,
            maxHeight: 191,
            minAge: 16,
            maxAge: 30,
            gender: ["Male"]
        }
    },
    [BOARDS.CURVE]: {
        label: "Curve",
        description: "Curve / Plus-size board.",
        constraints: {
            minHeight: 172,
            maxHeight: 183,
            minAge: 16,
            maxAge: 28,
            gender: ["Female"]
        }
    }
};

/**
 * Evaluates if an applicant fits a specific board's criteria.
 * Used by AI to suggest routing.
 * 
 * @param {Object} stats - Applicant stats (height, age, gender)
 * @param {String} boardName - The board to check against
 * @returns {Object} { suitable: boolean, reasons: string[] }
 */
export function evaluateBoardFit(stats, boardName) {
    const preset = BOARD_PRESETS[boardName];
    if (!preset) return { suitable: false, reasons: ["Invalid board"] };

    const reasons = [];
    const constraints = preset.constraints;

    // Height Check
    if (stats.height) {
        // Parse height if string (e.g. "175cm" -> 175)
        const heightVal = parseInt(stats.height.toString().replace(/[^0-9]/g, ''));
        if (!isNaN(heightVal)) {
            if (constraints.minHeight && heightVal < constraints.minHeight) {
                reasons.push(`Too short (${heightVal}cm < ${constraints.minHeight}cm)`);
            }
            if (constraints.maxHeight && heightVal > constraints.maxHeight) {
                reasons.push(`Too tall (${heightVal}cm > ${constraints.maxHeight}cm)`);
            }
        }
    }

    // Age Check
    if (stats.age) {
        const ageVal = parseInt(stats.age);
        if (!isNaN(ageVal)) {
            if (constraints.minAge && ageVal < constraints.minAge) {
                reasons.push(`Too young (${ageVal} < ${constraints.minAge})`);
            }
            if (constraints.maxAge && ageVal > constraints.maxAge) {
                reasons.push(`Too old (${ageVal} > ${constraints.maxAge})`);
            }
        }
    }

    // Gender Check (Soft check, as gender can be fluid/not captured perfectly)
    if (stats.gender && constraints.gender) {
        // Simple case-insensitive check
        const genderMatch = constraints.gender.some(g => g.toLowerCase() === stats.gender.toLowerCase());
        if (!genderMatch) {
            reasons.push(`Gender mismatch (Expected: ${constraints.gender.join("/")})`);
        }
    }

    return {
        suitable: reasons.length === 0,
        reasons
    };
}

/**
 * Helper to get all valid board names
 */
export function getValidBoards() {
    return Object.values(BOARDS);
}
