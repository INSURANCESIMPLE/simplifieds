import { getAccessToken } from './googleAuth';

export interface CalendarEventParams {
  summary: string;
  description: string;
  location?: string;
  startDateTime: string; // ISO string e.g. "2026-10-15T10:00:00-05:00"
  endDateTime: string;   // ISO string e.g. "2026-10-15T10:30:00-05:00"
  attendeeEmail?: string;
  timeZone?: string;
}

/**
 * Creates a Google Calendar Event using Google Calendar API v3
 */
export async function createGoogleCalendarEvent(
  params: CalendarEventParams,
  tokenOverride?: string
): Promise<{ success: boolean; eventUrl?: string; error?: string }> {
  const token = tokenOverride || getAccessToken();
  if (!token) {
    return { success: false, error: 'User is not authenticated with Google.' };
  }

  const eventPayload = {
    summary: params.summary,
    location: params.location || 'Virtual / Phone Consultation',
    description: params.description,
    start: {
      dateTime: params.startDateTime,
      timeZone: params.timeZone || 'America/New_York',
    },
    end: {
      dateTime: params.endDateTime,
      timeZone: params.timeZone || 'America/New_York',
    },
    attendees: params.attendeeEmail
      ? [
          { email: params.attendeeEmail },
          { email: 'JASON@INSURANCESIMPLIFIED.INFO' }
        ]
      : [{ email: 'JASON@INSURANCESIMPLIFIED.INFO' }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-[#000]': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Google Calendar API Error:', data);
      return {
        success: false,
        error: data.error?.message || 'Failed to create Google Calendar event.',
      };
    }

    return {
      success: true,
      eventUrl: data.htmlLink,
    };
  } catch (err: any) {
    console.error('Google Calendar Fetch Exception:', err);
    return { success: false, error: err.message || 'Network error connecting to Google Calendar.' };
  }
}

/**
 * Fallback direct link builder to open Google Calendar Web UI in a new tab with populated details
 */
export function buildGoogleCalendarWebUrl(params: {
  title: string;
  details: string;
  location?: string;
  startIso: string;
  endIso: string;
}): string {
  const formatUtcDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const datesStr = `${formatUtcDate(params.startIso)}/${formatUtcDate(params.endIso)}`;
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const query = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.title,
    details: params.details,
    location: params.location || 'Insurance Made Simple - Virtual Consultation',
    dates: datesStr,
  });

  return `${baseUrl}?${query.toString()}`;
}
