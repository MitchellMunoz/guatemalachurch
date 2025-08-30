// Converts an ISO date string (YYYY-MM-DD) to a Date object set to noon UTC of that date.
export function toNoonUTCFromISODate(dateStr: string): Date {
        const safe = (dateStr || '').trim();
        const parts = safe.split('-');
        const yyyy = Number(parts[0] || NaN);
        const mm = Number(parts[1] || NaN);
        const dd = Number(parts[2] || NaN);
        if (!Number.isFinite(yyyy) || !Number.isFinite(mm) || !Number.isFinite(dd)) {
            const now = new Date();
            return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
        }
        return new Date(Date.UTC(yyyy, mm - 1, dd, 12, 0, 0, 0));
    }