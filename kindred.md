# Product Requirements Document: Small Event Planner Web App

## 1. Product Summary

### Product Name
Working name: **GatherPlan**

### One-Line Description
A web app for planning small events and gatherings, inviting guests, tracking RSVPs, managing budgets, coordinating food, and assigning tasks in one shared workspace.

### Product Type
Responsive web application for desktop and mobile browsers.

### Primary Use Case
A host is organizing a small event such as a dinner party, birthday gathering, game night, baby shower, picnic, community meetup, or casual celebration and needs a simple way to coordinate guests, money, food, and responsibilities.

---

## 2. Problem Statement

Small events often require coordination across multiple tools: group chats for invites, spreadsheets for budgets, notes apps for food lists, payment apps for expenses, and reminders for tasks. This creates fragmented planning, missed responsibilities, unclear attendance, and poor visibility into costs.

The product should give hosts a single lightweight planning hub where they can organize the event, invite people, track attendance, manage food contributions, assign tasks, and monitor spending without the complexity of enterprise event management tools.

---

## 3. Goals and Non-Goals

## 3.1 Product Goals

1. Enable a host to create and manage a small event in under 5 minutes.
2. Allow hosts to invite guests and track RSVP status clearly.
3. Provide a simple shared event page guests can access without mandatory account creation.
4. Help hosts manage budget, expenses, and expected per-person cost.
5. Help hosts coordinate food, drinks, supplies, and dietary needs.
6. Help hosts assign and track tasks before the event.
7. Reduce planning ambiguity by centralizing event details, decisions, responsibilities, and guest responses.
8. Make the product useful for events with 3 to 100 guests.

## 3.2 Business Goals

1. Validate demand for lightweight social event planning.
2. Drive repeat usage from hosts who plan multiple gatherings per year.
3. Build a foundation for future monetization through premium planning features, templates, group expense settlement, vendor integrations, or event memory features.
4. Capture invite-led viral growth by exposing guests to the product through event pages.

## 3.3 Non-Goals for MVP

The MVP will not include:

1. Ticket sales.
2. Venue booking marketplace.
3. Vendor marketplace.
4. Complex seating charts.
5. Multi-day conference management.
6. Public event discovery.
7. Native iOS or Android apps.
8. Advanced email marketing automation.
9. Full payment processing or money transfers.
10. Enterprise permissions and role management.

---

## 4. Target Users

## 4.1 Primary User: Host

The host creates the event, invites guests, tracks planning progress, manages budget, and coordinates responsibilities.

Typical hosts include:

1. People organizing dinner parties, birthdays, game nights, holiday gatherings, picnics, showers, or small celebrations.
2. Community organizers running small meetups.
3. Friend groups planning casual shared events.
4. Families coordinating gatherings.

Host needs:

1. Quickly create an event.
2. Share event details easily.
3. Know who is coming.
4. Know what food and supplies are covered.
5. Track costs.
6. Assign and follow up on tasks.
7. Avoid chasing people across many channels.

## 4.2 Secondary User: Guest

The guest receives an invite, views event details, RSVPs, provides dietary information, optionally claims food/supply items, and completes assigned tasks.

Guest needs:

1. Access the event without friction.
2. Understand date, time, location, and expectations.
3. RSVP quickly.
4. Update RSVP later.
5. See what they are expected to bring or do.
6. Ask questions or leave notes.

## 4.3 Tertiary User: Co-Host

A co-host helps manage the event alongside the primary host.

Co-host needs:

1. Edit event details.
2. Manage guest list.
3. Manage tasks, budget, and food.
4. See the same planning dashboard as the host.

Co-hosting is recommended for MVP if technically feasible, but can be limited to one primary host in the earliest version.

---

## 5. Key Use Cases

## 5.1 Host Creates an Event

The host enters event name, date, time, location, description, and optional event type. The app creates a planning dashboard and shareable invite page.

## 5.2 Host Invites Guests

The host adds guests manually by name, email, or phone number, or shares a public/private event invite link.

## 5.3 Guest RSVPs

The guest opens the invite link, views event details, selects RSVP status, adds party size if allowed, enters dietary restrictions, and optionally leaves a note.

## 5.4 Host Tracks Attendance

The host sees counts for attending, maybe, declined, invited, and no response. The host can filter and follow up with guests who have not responded.

## 5.5 Host Manages Budget

The host sets an optional budget target, adds estimated and actual expenses, categorizes expenses, and sees total spend, remaining budget, and estimated per-attendee cost.

## 5.6 Host Coordinates Food and Supplies

The host creates a list of food, drinks, supplies, or potluck items. Guests or hosts can claim items. The host can track quantity, owner, cost, and status.

## 5.7 Host Assigns Tasks

The host creates tasks, assigns them to self, co-hosts, or guests, sets due dates, and tracks status.

## 5.8 Host Sends Updates

The host sends important event updates to guests, such as time changes, location updates, what to bring, or reminders.

MVP may implement this as copyable update text or email-only messages before adding SMS/push integrations.

---

## 6. MVP Scope

## 6.1 MVP Must-Have Features

1. User account creation and login for hosts.
2. Event creation and editing.
3. Event dashboard for hosts.
4. Shareable event invite page.
5. Guest RSVP flow.
6. Guest list management.
7. RSVP tracking.
8. Budget tracker.
9. Expense list with categories.
10. Food and supply planning list.
11. Task tracker.
12. Basic comments or notes from guests.
13. Event privacy controls.
14. Responsive web design.

## 6.2 MVP Should-Have Features

1. Co-host support.
2. Email invitations.
3. RSVP deadline.
4. Dietary restriction collection.
5. Plus-one controls.
6. Reminder prompts for unresponded guests.
7. Event templates.
8. Export guest list to CSV.

## 6.3 MVP Could-Have Features

1. SMS invitations.
2. Calendar file attachment or add-to-calendar link.
3. Polls for date/time or food preferences.
4. Expense split estimate.
5. Image/banner upload for event page.
6. Reusable guest groups.
7. Duplicate event.

## 6.4 Explicitly Out of Scope for MVP

1. Real-time group chat.
2. Payment collection.
3. Vendor booking.
4. Public event browsing.
5. Ticketing.
6. AI-generated menus or plans.
7. Native mobile apps.

---

## 7. User Experience Principles

1. **Fast setup:** Creating an event should require only essential details.
2. **Low guest friction:** Guests should not need to create an account to RSVP.
3. **Host clarity:** The host dashboard should always show the current planning state.
4. **Mobile-first guest experience:** Most invitees will open links on phones.
5. **Flexible planning:** The app should support structured planning without forcing every event to use every feature.
6. **Progressive complexity:** Advanced options should be available but not block the core flow.
7. **Shareable by default, private by control:** Hosts should be able to share links easily while controlling who can view or respond.

---

## 8. User Flows

## 8.1 Host Signup and Event Creation Flow

1. Host lands on homepage.
2. Host clicks “Create Event.”
3. Host signs up or logs in.
4. Host enters event details:
   - Event name.
   - Event type.
   - Date.
   - Start time.
   - Optional end time.
   - Location.
   - Description.
   - RSVP deadline.
5. Host clicks “Create Event.”
6. System creates event dashboard.
7. Host is prompted to invite guests or continue planning.

Acceptance criteria:

1. Host can create an event with only name, date, and time.
2. Event is saved and visible in the host’s event list.
3. Host can edit event details after creation.
4. System generates a unique shareable invite link.

## 8.2 Guest RSVP Flow

1. Guest opens event invite link.
2. Guest sees event details.
3. Guest enters name if not already known.
4. Guest selects RSVP status:
   - Going.
   - Maybe.
   - Not going.
5. If plus-ones are enabled, guest enters number of additional attendees.
6. Guest optionally enters dietary restrictions.
7. Guest optionally leaves note to host.
8. Guest submits RSVP.
9. System shows confirmation page.
10. Guest can later return to update RSVP.

Acceptance criteria:

1. Guest can RSVP without creating an account.
2. Guest cannot submit without a name and RSVP status.
3. RSVP status updates host dashboard immediately or on page refresh.
4. Guest can update an existing RSVP using the same invite link and identifying information.
5. Host can manually edit a guest’s RSVP if needed.

## 8.3 Host Guest Management Flow

1. Host opens event dashboard.
2. Host selects “Guests.”
3. Host adds guests individually or via bulk paste.
4. Host sees guest status table.
5. Host filters by RSVP status.
6. Host copies invite link or sends invites.
7. Host manually updates guest details when needed.

Acceptance criteria:

1. Host can add, edit, and remove guests.
2. Host can see RSVP counts by status.
3. Host can filter guests by status.
4. Host can copy the invite link.
5. Host can identify guests who have not responded.

## 8.4 Budget Flow

1. Host opens Budget tab.
2. Host optionally sets total budget.
3. Host adds expense:
   - Name.
   - Category.
   - Estimated cost.
   - Actual cost.
   - Paid by.
   - Notes.
4. System calculates total estimated cost, total actual cost, remaining budget, and cost per attending guest.
5. Host can edit or delete expenses.

Acceptance criteria:

1. Host can create, edit, and delete expenses.
2. Expense can be saved with either estimated or actual cost.
3. Budget summary updates when expenses or RSVP counts change.
4. Per-person cost uses guests marked “Going” plus approved plus-ones.
5. Budget section works even when no budget target is set.

## 8.5 Food and Supplies Flow

1. Host opens Food & Supplies tab.
2. Host adds item:
   - Item name.
   - Category.
   - Quantity.
   - Needed or optional.
   - Claimed by.
   - Estimated cost.
   - Status.
3. Host can mark item as unclaimed, claimed, purchased, prepared, or completed.
4. Guest can claim an item if guest claiming is enabled.
5. Host can edit claims.

Acceptance criteria:

1. Host can add, edit, and remove food or supply items.
2. Items can be grouped by category.
3. Guest can claim available items from the invite page when enabled.
4. Host can disable guest claiming.
5. Host can see which items are unclaimed.

## 8.6 Task Flow

1. Host opens Tasks tab.
2. Host creates task:
   - Title.
   - Description.
   - Assignee.
   - Due date.
   - Priority.
   - Status.
3. Assigned person can mark task as complete if they have access.
4. Host can filter tasks by status or assignee.

Acceptance criteria:

1. Host can create, edit, delete, and complete tasks.
2. Task can be assigned to host, co-host, or guest.
3. Tasks can have due dates.
4. Task status options include Not Started, In Progress, Blocked, Done.
5. Host dashboard shows overdue and incomplete task counts.

---

## 9. Functional Requirements

## 9.1 Authentication and Accounts

### Requirements

1. Hosts must be able to create an account using email and password.
2. Hosts must be able to log in and log out.
3. Hosts must be able to reset password.
4. Guests should not be required to create accounts for MVP RSVP.
5. Logged-in users should see a list of events they created or co-host.

### Acceptance Criteria

1. Invalid login attempts show a clear error.
2. Password reset sends a secure reset link.
3. Authenticated sessions persist across browser refresh.
4. Unauthenticated hosts cannot access private event dashboards.

---

## 9.2 Event Management

### Requirements

Host can create and edit:

1. Event name.
2. Event type.
3. Date.
4. Start time.
5. End time.
6. Time zone.
7. Location name.
8. Address or map link.
9. Virtual meeting link.
10. Description.
11. Dress code or instructions.
12. RSVP deadline.
13. Plus-one settings.
14. Visibility settings.
15. Guest claiming permissions for food and tasks.

### Acceptance Criteria

1. Event name, date, and start time are required.
2. Location can be physical, virtual, both, or TBD.
3. Event details update on the guest invite page after host edits.
4. Past events are clearly labeled as past.
5. Host can archive or delete an event.

---

## 9.3 Event Dashboard

### Requirements

Dashboard should show:

1. Event name, date, time, and location.
2. RSVP summary.
3. Number of attending guests.
4. Number of maybe guests.
5. Number of declined guests.
6. Number of no-response guests.
7. Budget summary.
8. Unclaimed food/supply items.
9. Incomplete and overdue tasks.
10. Invite link.
11. Suggested next actions.

### Acceptance Criteria

1. Dashboard loads within acceptable performance target.
2. Dashboard reflects latest event data.
3. Host can navigate to Guests, Budget, Food & Supplies, and Tasks from dashboard.
4. Dashboard empty states explain what to do next.

---

## 9.4 Guest List and RSVP Management

### Requirements

Host can manage guest records with:

1. Name.
2. Email.
3. Phone.
4. RSVP status.
5. Party size.
6. Dietary restrictions.
7. Notes.
8. Invitation sent status.
9. Last updated timestamp.

RSVP statuses:

1. Invited.
2. Going.
3. Maybe.
4. Not Going.
5. No Response.

### Acceptance Criteria

1. Host can add one guest manually.
2. Host can bulk paste guest names/emails.
3. Host can edit and delete guest records.
4. Host can manually set RSVP status.
5. Host can search guest list.
6. Host can filter guest list by RSVP status.
7. Guest RSVP changes are stored with timestamp.

---

## 9.5 Invitations

### Requirements

MVP invitation mechanisms:

1. Copyable event invite link.
2. Optional email invites if email service is integrated.
3. Share text generated for host to paste into messaging apps.

Invite page must show:

1. Event name.
2. Date and time.
3. Location.
4. Description.
5. Host name.
6. RSVP form.
7. Food/task contribution options if enabled.
8. Privacy note if event is invite-only.

### Acceptance Criteria

1. Host can copy invite link from dashboard.
2. Invite link opens public or restricted guest page depending on event settings.
3. Guest can RSVP from invite page.
4. Event page has mobile-friendly layout.
5. Invite page hides host-only budget data by default.

---

## 9.6 Privacy and Access Control

### Event Visibility Options

1. **Anyone with link can view and RSVP.**
2. **Anyone with link can view, but RSVP requires matching an invited guest.**
3. **Only invited guests can view.**

MVP recommendation: implement options 1 and 2 first.

### Requirements

1. Host dashboard requires authenticated host or co-host access.
2. Guest invite page access depends on event visibility setting.
3. Budget details are hidden from guests by default.
4. Host can choose whether guests can see the guest list.
5. Host can choose whether guests can claim food/supply items.
6. Host can choose whether guests can see tasks assigned to others.

### Acceptance Criteria

1. Unauthorized users cannot access host dashboard.
2. Guests cannot edit event details.
3. Guests cannot view private budget unless host explicitly enables sharing in future versions.
4. Invite-only RSVP prevents random names from being added when setting is enabled.

---

## 9.7 Budget Management

### Expense Fields

1. Expense name.
2. Category.
3. Estimated amount.
4. Actual amount.
5. Paid by.
6. Payment status.
7. Date.
8. Notes.

### Expense Categories

Default categories:

1. Food.
2. Drinks.
3. Venue.
4. Decorations.
5. Supplies.
6. Entertainment.
7. Gifts.
8. Transportation.
9. Other.

### Budget Summary Metrics

1. Total estimated cost.
2. Total actual cost.
3. Budget target.
4. Remaining budget.
5. Budget overrun.
6. Estimated cost per attending person.
7. Actual cost per attending person.

### Acceptance Criteria

1. Host can add expenses without setting total budget.
2. Actual amount overrides estimated amount in actual total calculations.
3. Missing actual amount should not block expense creation.
4. Per-person estimate updates when RSVP count changes.
5. Budget overrun is clearly indicated.

---

## 9.8 Food and Supplies Management

### Item Fields

1. Item name.
2. Category.
3. Quantity.
4. Unit.
5. Needed count.
6. Claimed count.
7. Claimed by.
8. Estimated cost.
9. Actual cost.
10. Status.
11. Notes.

### Categories

1. Appetizers.
2. Main dishes.
3. Sides.
4. Desserts.
5. Snacks.
6. Non-alcoholic drinks.
7. Alcoholic drinks.
8. Ice.
9. Plates/cups/cutlery.
10. Decorations.
11. Equipment.
12. Other supplies.

### Statuses

1. Needed.
2. Claimed.
3. Purchased.
4. Prepared.
5. Completed.

### Acceptance Criteria

1. Host can create food and supply items.
2. Host can mark whether an item is claimable by guests.
3. Guests can claim items only when claiming is enabled.
4. Host can override or remove claims.
5. Host can see unclaimed needed items.
6. Items can be sorted by category, claimant, and status.

---

## 9.9 Task Management

### Task Fields

1. Title.
2. Description.
3. Assignee.
4. Due date.
5. Priority.
6. Status.
7. Related category.
8. Visibility.
9. Created by.
10. Updated timestamp.

### Priorities

1. Low.
2. Medium.
3. High.

### Statuses

1. Not Started.
2. In Progress.
3. Blocked.
4. Done.

### Acceptance Criteria

1. Host can create, edit, delete, and complete tasks.
2. Tasks can be assigned to event participants.
3. Guests can mark assigned tasks complete if guest task interaction is enabled.
4. Overdue tasks are highlighted.
5. Dashboard shows incomplete and overdue task counts.

---

## 9.10 Notes and Guest Comments

### Requirements

1. Guests can leave an RSVP note.
2. Hosts can add private planning notes.
3. Hosts can view all guest notes from the guest list.
4. Guest notes should not be visible to other guests unless explicitly enabled in future versions.

### Acceptance Criteria

1. RSVP note is saved with guest record.
2. Host private notes are not visible on invite page.
3. Guest notes can be edited or removed by host.

---

## 9.11 Notifications and Reminders

### MVP Requirements

1. Host can generate a message to remind guests who have not responded.
2. Host can generate a message for event updates.
3. If email integration is included, host can send email reminders to selected guests.

### Post-MVP Requirements

1. Automated RSVP reminders.
2. SMS reminders.
3. Push notifications.
4. Task due date reminders.
5. Event day reminders.

### Acceptance Criteria

1. Host can filter no-response guests.
2. Host can copy reminder text.
3. If email is enabled, selected recipients receive message.
4. Notification history is stored if messages are sent through the app.

---

## 10. Data Model

## 10.1 User

Fields:

1. id.
2. name.
3. email.
4. password_hash.
5. avatar_url.
6. created_at.
7. updated_at.

Relationships:

1. User has many events as host.
2. User may have many events as co-host.

## 10.2 Event

Fields:

1. id.
2. host_user_id.
3. name.
4. event_type.
5. description.
6. date.
7. start_time.
8. end_time.
9. timezone.
10. location_type.
11. location_name.
12. address.
13. virtual_link.
14. rsvp_deadline.
15. plus_one_allowed.
16. max_plus_ones_per_guest.
17. visibility.
18. guest_list_visible.
19. food_claiming_enabled.
20. task_guest_interaction_enabled.
21. budget_target.
22. invite_slug.
23. status.
24. created_at.
25. updated_at.

## 10.3 Guest

Fields:

1. id.
2. event_id.
3. name.
4. email.
5. phone.
6. rsvp_status.
7. party_size.
8. dietary_restrictions.
9. note.
10. invite_token.
11. invitation_sent_at.
12. rsvp_updated_at.
13. created_at.
14. updated_at.

## 10.4 Expense

Fields:

1. id.
2. event_id.
3. name.
4. category.
5. estimated_amount.
6. actual_amount.
7. paid_by_name.
8. paid_by_user_id.
9. payment_status.
10. date.
11. notes.
12. created_at.
13. updated_at.

## 10.5 FoodSupplyItem

Fields:

1. id.
2. event_id.
3. name.
4. category.
5. quantity.
6. unit.
7. needed_count.
8. claimed_count.
9. claimed_by_guest_id.
10. claimed_by_name.
11. estimated_cost.
12. actual_cost.
13. status.
14. is_guest_claimable.
15. notes.
16. created_at.
17. updated_at.

## 10.6 Task

Fields:

1. id.
2. event_id.
3. title.
4. description.
5. assignee_type.
6. assignee_user_id.
7. assignee_guest_id.
8. assignee_name.
9. due_date.
10. priority.
11. status.
12. visibility.
13. created_by_user_id.
14. created_at.
15. updated_at.

## 10.7 EventActivity

Fields:

1. id.
2. event_id.
3. actor_type.
4. actor_id.
5. action_type.
6. entity_type.
7. entity_id.
8. metadata.
9. created_at.

Purpose:

1. Track important changes.
2. Support future activity feed.
3. Support debugging and audit trails.

---

## 11. Permissions Matrix

| Action | Host | Co-host | Guest | Anonymous Visitor |
|---|---:|---:|---:|---:|
| View host dashboard | Yes | Yes | No | No |
| Edit event details | Yes | Yes | No | No |
| Delete event | Yes | No, unless granted | No | No |
| View invite page | Yes | Yes | Depends on privacy | Depends on privacy |
| RSVP | Optional | Optional | Yes | Depends on privacy |
| Add guest | Yes | Yes | No | No |
| Edit guest RSVP | Yes | Yes | Own RSVP only | Own RSVP only if allowed |
| View budget | Yes | Yes | No by default | No |
| Edit budget | Yes | Yes | No | No |
| View food/supplies | Yes | Yes | Yes if enabled | Yes if public link |
| Claim food/supplies | Yes | Yes | Yes if enabled | Maybe, depending privacy |
| Edit food/supplies | Yes | Yes | Claimed item only, optional | No |
| View tasks | Yes | Yes | Assigned/visible tasks | No |
| Complete assigned task | Yes | Yes | Yes if enabled | No |

---

## 12. Core Screens

## 12.1 Marketing/Homepage

Purpose:

1. Explain product value.
2. Drive host event creation.
3. Show example use cases.

Required sections:

1. Hero with primary CTA: “Create an Event.”
2. Use cases: dinner party, birthday, picnic, shower, meetup.
3. Feature summary: RSVPs, budget, food, tasks.
4. Secondary CTA.

## 12.2 Signup/Login

Required elements:

1. Email field.
2. Password field.
3. Continue button.
4. Password reset link.
5. Error states.

## 12.3 Event List

Required elements:

1. Upcoming events.
2. Past events.
3. Create event button.
4. Event card with date, name, RSVP count, and planning status.

## 12.4 Event Creation/Edit Screen

Required sections:

1. Basic details.
2. Date/time.
3. Location.
4. RSVP settings.
5. Privacy settings.
6. Optional description/instructions.

## 12.5 Host Dashboard

Required modules:

1. Event overview.
2. Invite link.
3. RSVP summary.
4. Budget summary.
5. Food/supplies summary.
6. Task summary.
7. Next actions.

## 12.6 Guests Screen

Required elements:

1. RSVP status cards.
2. Guest table.
3. Add guest button.
4. Bulk add option.
5. Filters.
6. Search.
7. Invite/reminder actions.

## 12.7 Budget Screen

Required elements:

1. Budget target input.
2. Summary metrics.
3. Expense table.
4. Add expense modal/form.
5. Category breakdown.

## 12.8 Food & Supplies Screen

Required elements:

1. Item list grouped by category.
2. Add item form.
3. Claim status.
4. Filters for unclaimed and incomplete items.
5. Guest claiming toggle.

## 12.9 Tasks Screen

Required elements:

1. Task list.
2. Add task form.
3. Filters by status, assignee, due date, priority.
4. Overdue indicator.

## 12.10 Guest Invite Page

Required elements:

1. Event name.
2. Date/time.
3. Location.
4. Description/instructions.
5. RSVP form.
6. Dietary restrictions field.
7. Guest note field.
8. Claimable food/supply items if enabled.
9. Assigned tasks if applicable.
10. Confirmation state after RSVP.

---

## 13. Calculations and Business Logic

## 13.1 Attendee Count

Attendee count equals:

Going guests + approved plus-ones attached to Going guests.

Maybe guests should not be included in default per-person cost, but host may toggle to include Maybe guests in estimates in a future version.

## 13.2 Budget Totals

Estimated total:

Sum of estimated_amount for all expenses.

Actual total:

Sum of actual_amount for all expenses where actual_amount exists.

Hybrid projected total:

For each expense, use actual_amount if present; otherwise use estimated_amount.

Recommended default dashboard metric:

Hybrid projected total.

## 13.3 Cost Per Person

Cost per person equals:

Hybrid projected total / attendee count.

Rules:

1. If attendee count is zero, show “No confirmed attendees yet.”
2. If total cost is zero, show $0 or local currency equivalent.
3. Currency should be event-level or user-level setting. MVP can default to USD if target market is U.S.-first.

## 13.4 RSVP Deadline

Rules:

1. If RSVP deadline has passed, invite page should still allow RSVP unless host has closed RSVPs.
2. Host should see an indicator that the deadline passed.
3. Post-MVP: host can close RSVPs automatically after deadline.

## 13.5 Plus-Ones

Rules:

1. Host can enable or disable plus-ones.
2. Host can set max plus-ones per guest.
3. Guest party size must be at least 1.
4. Guest party size cannot exceed 1 + max_plus_ones_per_guest.

---

## 14. Analytics and Success Metrics

## 14.1 Activation Metrics

1. Percentage of users who create an event after signup.
2. Median time to create first event.
3. Percentage of created events with at least one guest added or invite link copied.
4. Percentage of created events with at least one RSVP.

## 14.2 Engagement Metrics

1. Average guests per event.
2. RSVP completion rate.
3. Percentage of events using budget feature.
4. Percentage of events using food/supplies feature.
5. Percentage of events using task feature.
6. Average number of planning sessions per event.
7. Number of event edits before event date.

## 14.3 Retention Metrics

1. Percentage of hosts who create a second event within 90 days.
2. Percentage of guests who later become hosts.
3. Monthly active hosts.
4. Repeat event creation rate.

## 14.4 Quality Metrics

1. RSVP page load time.
2. Event creation completion rate.
3. Error rate for RSVP submissions.
4. Email invite delivery rate if email invites are included.
5. Support requests per 100 events.

## 14.5 North Star Metric

Recommended North Star Metric:

**Number of events with at least 3 guests invited and at least 1 confirmed RSVP.**

Reason:

This captures meaningful event planning usage better than raw signups or event creation alone.

---

## 15. Non-Functional Requirements

## 15.1 Performance

1. Invite page should load in under 2 seconds on a typical mobile connection.
2. Host dashboard should load in under 3 seconds for events with up to 100 guests, 100 tasks, 100 expenses, and 100 food/supply items.
3. RSVP submission should complete in under 1 second after server receives request under normal load.

## 15.2 Reliability

1. RSVP submissions must not be lost.
2. Duplicate RSVP submissions should be handled gracefully.
3. System should prevent accidental double creation of guests when possible.
4. Budget and task edits should be persisted immediately after save.

## 15.3 Security

1. Use secure password hashing.
2. Use HTTPS in production.
3. Protect host dashboard routes with authentication.
4. Use invite tokens or slugs that are not easily guessable.
5. Validate all form inputs server-side.
6. Rate-limit public RSVP submissions.
7. Prevent cross-site scripting in guest notes and descriptions.
8. Avoid exposing private guest contact information to other guests.

## 15.4 Privacy

1. Guests should understand what information is shared with the host.
2. Guest emails and phone numbers should not be publicly visible.
3. Host should control guest list visibility.
4. Deleted events should remove or anonymize associated guest data according to product policy.

## 15.5 Accessibility

1. WCAG 2.1 AA target.
2. Forms should have visible labels.
3. Buttons should have accessible names.
4. UI should support keyboard navigation.
5. Color should not be the only indicator of status.
6. Error messages should be screen-reader friendly.

## 15.6 Browser Support

MVP should support latest stable versions of:

1. Chrome.
2. Safari.
3. Firefox.
4. Edge.
5. Mobile Safari.
6. Chrome for Android.

---

## 16. Edge Cases

## 16.1 RSVP Edge Cases

1. Guest changes RSVP from Going to Not Going after claiming an item.
   - System should notify host or mark claimed item as needing review.
2. Guest submits duplicate RSVP under slightly different name.
   - Host should be able to merge or delete duplicates in a future version. MVP should allow manual cleanup.
3. Event is invite-only and guest enters unmatched email.
   - System should show a clear error and allow them to contact host if enabled.
4. Guest enters plus-one count above allowed limit.
   - System should block submission with validation error.
5. RSVP deadline has passed.
   - System should show deadline warning but follow host’s RSVP policy.

## 16.2 Budget Edge Cases

1. Attendee count is zero.
   - Do not divide by zero.
2. Expense has actual cost but no estimated cost.
   - Include actual cost in actual and projected totals.
3. Event exceeds budget.
   - Show over-budget state.
4. Currency mismatch.
   - MVP should avoid multi-currency complexity by using one event currency.

## 16.3 Food/Supplies Edge Cases

1. Two guests claim same item simultaneously.
   - Server should enforce claim count limit.
2. Claimed item is deleted by host.
   - Guest should no longer see it as assigned.
3. Quantity needed is greater than one.
   - System should support partial claims in future; MVP may use simple claimed/unclaimed unless quantity support is implemented carefully.

## 16.4 Task Edge Cases

1. Task assignee declines event.
   - Host should see warning or manually reassign.
2. Task is overdue.
   - Highlight on dashboard.
3. Guest tries to edit a task not assigned to them.
   - Block action.

---

## 17. MVP Release Criteria

The MVP is ready to release when:

1. A host can sign up, create an event, and access the dashboard.
2. Host can share an invite link.
3. Guest can RSVP without an account.
4. Host can see RSVP counts and guest details.
5. Host can add, edit, and delete expenses.
6. Host can see budget summary.
7. Host can add, edit, and delete food/supply items.
8. Host can add, edit, and complete tasks.
9. Invite page is usable on mobile.
10. Basic access control prevents guests from seeing host dashboard.
11. Core flows pass manual QA on desktop and mobile.
12. Product has clear empty states and error handling.

---

## 18. Suggested Development Phases

## Phase 1: Core Event and RSVP

Scope:

1. Authentication.
2. Event creation/editing.
3. Host event dashboard shell.
4. Shareable invite page.
5. RSVP form.
6. Guest list and RSVP tracking.

Release outcome:

Host can create an event, invite guests via link, and track attendance.

## Phase 2: Planning Tools

Scope:

1. Budget tracker.
2. Expense categories.
3. Food and supplies list.
4. Task tracker.
5. Dashboard summaries.

Release outcome:

Host can manage the actual planning work for the event.

## Phase 3: Collaboration and Communication

Scope:

1. Co-host support.
2. Email invitations.
3. Reminder generation or sending.
4. Guest item claiming.
5. Guest task completion.

Release outcome:

Planning becomes more collaborative and less host-dependent.

## Phase 4: Polish and Growth

Scope:

1. Event templates.
2. Duplicate event.
3. Add-to-calendar.
4. CSV export.
5. Better activity feed.
6. Analytics instrumentation.
7. Improved mobile polish.

Release outcome:

Product becomes easier to reuse and share.

---

## 19. Open Product Decisions

1. Should guests RSVP using only name, or should email be required?
   - Recommendation: require name; email optional unless event is invite-only.
2. Should guests be able to see who else is coming?
   - Recommendation: host-controlled setting, off by default for privacy.
3. Should budget be visible to guests?
   - Recommendation: no for MVP.
4. Should guest claiming require identity verification?
   - Recommendation: no for open-link events; yes for invite-only events.
5. Should host be able to collect payments?
   - Recommendation: not in MVP; show estimated split only in a later version.
6. Should SMS invites be included in MVP?
   - Recommendation: no unless SMS is core to target market; start with copyable link and email.
7. Should food item claiming support partial quantities?
   - Recommendation: yes eventually; MVP can start with single-owner claims unless potluck coordination is central.

---

## 20. Risks and Mitigations

## 20.1 Risk: Product Feels Like a Spreadsheet With Login

Mitigation:

1. Use guided setup.
2. Provide templates.
3. Show dashboard summaries and next actions.
4. Keep guest experience polished and lightweight.

## 20.2 Risk: Guests Do Not Want to Create Accounts

Mitigation:

1. Do not require guest accounts for RSVP.
2. Use secure invite tokens.
3. Allow host-controlled privacy levels.

## 20.3 Risk: Hosts Use Existing Chat Apps Instead

Mitigation:

1. Make invite sharing compatible with chat apps.
2. Generate copyable messages.
3. Centralize structured planning that chat apps handle poorly.

## 20.4 Risk: Too Many Features Create Complexity

Mitigation:

1. Use modular tabs.
2. Make budget, food, and tasks optional.
3. Use empty states that invite action without overwhelming the host.

## 20.5 Risk: RSVP Data Gets Messy

Mitigation:

1. Allow host manual edits.
2. Support invite-only RSVP mode.
3. Add duplicate detection later.

---

## 21. Example MVP User Stories

## Event Creation

1. As a host, I want to create an event with basic details so I can start planning.
2. As a host, I want to edit event details so I can update guests if plans change.
3. As a host, I want a shareable invite link so I can send it through any channel.

## RSVP

1. As a guest, I want to RSVP without creating an account so I can respond quickly.
2. As a guest, I want to update my RSVP so the host has accurate attendance.
3. As a host, I want to see who has not responded so I know who to follow up with.

## Budget

1. As a host, I want to add estimated expenses so I can plan spending.
2. As a host, I want to update actual expenses so I can track final costs.
3. As a host, I want to see cost per attendee so I can understand affordability.

## Food and Supplies

1. As a host, I want to list food and supplies so I know what is needed.
2. As a guest, I want to claim an item to bring so I can contribute.
3. As a host, I want to see unclaimed items so I can fill planning gaps.

## Tasks

1. As a host, I want to create tasks so I can organize prep work.
2. As a host, I want to assign tasks so others can help.
3. As an assignee, I want to mark a task complete so the host knows it is done.

---

## 22. Detailed Acceptance Test Checklist

## Account and Event

1. User can sign up.
2. User can log in.
3. User can create event with required fields.
4. User cannot create event without name, date, and start time.
5. User can edit event details.
6. User can archive or delete event.
7. User can view upcoming and past events.

## Invite and RSVP

1. Invite link opens event page.
2. Event page shows correct details.
3. Guest can RSVP Going.
4. Guest can RSVP Maybe.
5. Guest can RSVP Not Going.
6. Guest can add dietary restrictions.
7. Guest can add note.
8. Guest can update RSVP.
9. Host sees updated RSVP count.
10. Host can manually edit RSVP.

## Guests

1. Host can add guest manually.
2. Host can bulk add guests.
3. Host can edit guest.
4. Host can delete guest.
5. Host can filter by RSVP status.
6. Host can search guests.
7. Host can copy invite link.

## Budget

1. Host can set budget target.
2. Host can add estimated expense.
3. Host can add actual expense.
4. Host can edit expense.
5. Host can delete expense.
6. Total projected cost updates correctly.
7. Cost per attendee updates when RSVP count changes.
8. Over-budget state appears when projected cost exceeds budget.

## Food and Supplies

1. Host can add food item.
2. Host can add supply item.
3. Host can edit item.
4. Host can delete item.
5. Host can mark item as claimed.
6. Guest can claim item if enabled.
7. Guest cannot claim item if disabled.
8. Host can see unclaimed items.

## Tasks

1. Host can create task.
2. Host can assign task.
3. Host can set due date.
4. Host can set priority.
5. Host can change task status.
6. Host can delete task.
7. Overdue task appears as overdue.
8. Dashboard task count updates correctly.

## Permissions

1. Guest cannot access host dashboard.
2. Anonymous visitor cannot access private invite-only event.
3. Guest cannot see budget by default.
4. Guest cannot edit event details.
5. Guest cannot edit another guest’s RSVP in invite-only mode.

---

## 23. Recommended MVP Navigation

Top-level authenticated navigation:

1. Events.
2. Account.
3. Logout.

Event-level navigation:

1. Dashboard.
2. Guests.
3. Budget.
4. Food & Supplies.
5. Tasks.
6. Settings.

Guest invite page navigation:

1. Event details.
2. RSVP.
3. What to bring, if enabled.
4. Assigned tasks, if enabled.

---

## 24. Technical Specification

This section translates the product requirements into an implementation-ready technical plan. It is stack-aware but not locked to a single vendor. The recommended architecture favors speed, maintainability, and predictable scaling for a consumer SaaS-style web app.

---

## 24.1 App Architecture and System Design

This section defines the application architecture, system boundaries, service responsibilities, data flows, and deployment model for the event planner web app.

---

## 24.1.1 Architecture Goals

The architecture must support:

1. Fast MVP delivery.
2. Clear separation between host-facing and guest-facing experiences.
3. Reliable RSVP capture.
4. Secure public invite links.
5. Modular planning features: guests, budget, food/supplies, and tasks.
6. Low-friction guest access without mandatory accounts.
7. Future growth into notifications, reminders, payments, templates, and mobile apps.
8. Strong data integrity around event planning state.
9. Easy debugging and observability.
10. Reasonable scaling without premature microservices.

Architecture principles:

1. Start as a modular monolith.
2. Keep domain boundaries explicit.
3. Put business logic in services, not UI components or route handlers.
4. Treat public invite flows as a separate security surface.
5. Keep money calculations server-authoritative.
6. Keep permissions centralized.
7. Use async jobs for non-critical side effects.
8. Prefer transactional integrity for RSVP and claim operations.

---

## 24.1.2 Recommended Architecture Pattern

Recommended MVP architecture: **modular monolith with clear domain modules**.

This means the app ships as one deployable backend/web application, but the codebase is organized like separate systems internally.

Recommended logical systems:

1. Identity System.
2. Event Management System.
3. Invite and RSVP System.
4. Guest Management System.
5. Budget System.
6. Food and Supplies System.
7. Task Management System.
8. Notification System.
9. Activity and Audit System.
10. Analytics System.
11. Permission and Access Control System.
12. Public Event Page System.
13. Admin and Support System, post-MVP.

Why modular monolith first:

1. Faster to build than distributed microservices.
2. Easier to maintain transactional consistency.
3. Lower infrastructure complexity.
4. Easier to refactor into services later if needed.
5. Better fit for an MVP with tightly related domains.

Future extraction candidates:

1. Notification System.
2. Analytics/Event Pipeline.
3. Payment/Expense Settlement System.
4. File/Media Processing System.
5. AI Planning Assistant System.

---

## 24.1.3 High-Level System Diagram

```text
                         +-------------------------+
                         |        Browser          |
                         | Host App + Guest Page   |
                         +------------+------------+
                                      |
                                      | HTTPS
                                      v
+---------------------------------------------------------------------+
|                        Web Application Layer                         |
|                                                                     |
|  +-------------------+       +-----------------------------------+  |
|  | Host Web App       |       | Public Guest Invite App           |  |
|  | /app/*             |       | /e/:inviteSlug                    |  |
|  +-------------------+       +-----------------------------------+  |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  | API Layer                                                      |  |
|  | Auth Routes | Event Routes | RSVP Routes | Budget | Tasks     |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
|  +---------------------------------------------------------------+  |
|  | Domain Service Layer                                           |  |
|  | EventService | RsvpService | BudgetService | TaskService       |  |
|  | GuestService | FoodSupplyService | PermissionService           |  |
|  +---------------------------------------------------------------+  |
|                                                                     |
+-----------------------------+---------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|                          Data Layer                                  |
|                                                                     |
|  PostgreSQL        Redis/Queue        Object Storage                 |
|  Core data         Jobs/cache         Event images/future files      |
+-----------------------------+---------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|                      External Services                               |
|                                                                     |
|  Email Provider | Analytics | Error Monitoring | Maps | Auth Provider|
+---------------------------------------------------------------------+
```

---

## 24.1.4 Runtime Architecture

The application has four runtime surfaces:

1. **Authenticated Host App**.
2. **Public Guest Invite App**.
3. **Backend API**.
4. **Background Worker**.

### Authenticated Host App

Purpose:

1. Let hosts and co-hosts manage events.
2. Provide dashboard, guest management, budget, food/supplies, tasks, and settings.
3. Require authenticated session.

Routes:

```text
/app/events
/app/events/new
/app/events/:eventId
/app/events/:eventId/guests
/app/events/:eventId/budget
/app/events/:eventId/food-supplies
/app/events/:eventId/tasks
/app/events/:eventId/settings
```

Security posture:

1. Requires login.
2. Uses session-based authentication.
3. All event data access goes through permission checks.
4. Never trusts client-side role checks alone.

### Public Guest Invite App

Purpose:

1. Show event details to invited guests or anyone with the link, depending on event settings.
2. Allow RSVP without account creation.
3. Allow food item claiming and task completion if enabled.

Routes:

```text
/e/:inviteSlug
/e/:inviteSlug/rsvp
/e/:inviteSlug/confirmation
/e/:inviteSlug?token=:inviteToken
```

Security posture:

1. Does not require account login.
2. Uses invite slug and optional guest invite token.
3. Returns only public-safe event fields.
4. Applies rate limits.
5. Uses stricter serialization than host APIs.

### Backend API

Purpose:

1. Own all data mutations.
2. Enforce validation and permissions.
3. Return server-authoritative calculations.
4. Coordinate domain services.

API categories:

1. Auth API.
2. Event API.
3. Guest API.
4. RSVP API.
5. Budget API.
6. Food/Supplies API.
7. Task API.
8. Notification API.
9. Public Invite API.

### Background Worker

Purpose:

1. Send emails.
2. Process reminders.
3. Retry failed notifications.
4. Run future scheduled jobs.
5. Generate future summaries or reports.

MVP jobs:

1. Send event invitation email.
2. Send password reset email.
3. Send RSVP reminder email, if email reminders are included.
4. Record analytics events asynchronously, optional.

Post-MVP jobs:

1. Automated RSVP reminders.
2. Event-day reminders.
3. Task due reminders.
4. Post-event follow-up.
5. Photo/media processing.

---

## 24.1.5 System Boundaries

Each system owns a specific domain and should expose clear service methods.

## Identity System

Owns:

1. Host accounts.
2. Login and logout.
3. Password reset.
4. Email verification.
5. Sessions.

Does not own:

1. Guest RSVP identity.
2. Event-level permissions.
3. Invite tokens.

Primary tables:

1. `users`.
2. Auth-provider-managed session tables, if applicable.

Primary services:

1. `AuthService`.
2. `UserService`.

Key decisions:

1. Guests do not need full user accounts for MVP.
2. A guest can later become a user with the same email.
3. Guest records and user records should remain separate entities.

---

## Event Management System

Owns:

1. Event creation.
2. Event editing.
3. Event settings.
4. Event lifecycle: active, archived, deleted.
5. Event dashboard aggregation orchestration.
6. Event invite slug generation.

Does not own:

1. RSVP state details.
2. Expense records.
3. Task records.
4. Notification delivery.

Primary tables:

1. `events`.
2. `event_cohosts`.

Primary services:

1. `EventService`.
2. `EventDashboardService`.

Important methods:

```text
createEvent(userId, input)
updateEvent(userId, eventId, input)
archiveEvent(userId, eventId)
deleteEvent(userId, eventId)
getEventDashboard(userId, eventId)
generateInviteSlug()
```

System invariants:

1. Every event has one host.
2. Every event has one unique invite slug.
3. Deleted events cannot receive RSVPs.
4. Archived events are read-only by default unless restored.
5. Event date, start time, and timezone must always be present.

---

## Permission and Access Control System

Owns:

1. Host/co-host permission checks.
2. Guest access checks.
3. Public invite visibility rules.
4. Action-level authorization.
5. Host-only versus guest-visible field enforcement.

Does not own:

1. Authentication credentials.
2. Business object mutation.

Primary services:

1. `PermissionService`.
2. `PublicAccessService`.

Important methods:

```text
requireHostOrCohost(userId, eventId)
canEditEvent(userId, eventId)
canManageGuests(userId, eventId)
canManageBudget(userId, eventId)
canManageFood(userId, eventId)
canManageTasks(userId, eventId)
canViewPublicInvite(inviteSlug, token)
canSubmitPublicRsvp(inviteSlug, tokenOrIdentity)
canClaimFoodItem(inviteSlug, guestId, itemId)
canCompleteGuestTask(inviteSlug, guestId, taskId)
```

System invariants:

1. API route handlers must not manually duplicate permission logic.
2. Host dashboard data is never returned without authenticated host/co-host permission.
3. Guest-facing serializers must exclude private fields by default.
4. Budget is private unless a future explicit sharing feature is added.

---

## Invite and RSVP System

Owns:

1. Public invite page data.
2. RSVP submission.
3. RSVP updates.
4. Invite token validation.
5. RSVP deadline and closure rules.
6. Plus-one rules.
7. RSVP matching.

Does not own:

1. Full guest list management by host.
2. Email delivery.
3. Event settings beyond reading them.

Primary tables:

1. `events`.
2. `guests`.
3. `event_activities`.

Primary services:

1. `InviteService`.
2. `RsvpService`.

Important methods:

```text
getPublicEvent(inviteSlug, optionalToken)
submitPublicRsvp(inviteSlug, input, optionalToken)
submitTokenRsvp(inviteSlug, inviteToken, input)
matchGuestForRsvp(eventId, input, optionalToken)
validatePlusOneRules(event, partySize)
closeRsvps(eventId)
reopenRsvps(eventId)
```

System invariants:

1. RSVP status must always be one of the supported statuses.
2. Party size must never be less than 1.
3. Party size must obey event plus-one settings.
4. RSVP updates must update `rsvp_updated_at`.
5. RSVP submission must create an activity record.
6. Public invite response must never include budget data.

---

## Guest Management System

Owns:

1. Host-created guest records.
2. Guest imports.
3. Guest editing.
4. Guest deletion.
5. Guest filters and search.
6. Guest contact information.

Does not own:

1. Public RSVP submission flow.
2. Email sending.
3. Event-level dashboard calculations except providing guest counts.

Primary tables:

1. `guests`.

Primary services:

1. `GuestService`.
2. `GuestImportService`.

Important methods:

```text
createGuest(userId, eventId, input)
bulkCreateGuests(userId, eventId, guests)
updateGuest(userId, eventId, guestId, input)
deleteGuest(userId, eventId, guestId)
listGuests(userId, eventId, filters)
getRsvpSummary(eventId)
```

System invariants:

1. A guest belongs to exactly one event.
2. Guest email should be unique per event when present.
3. Guest invite token must be unique globally.
4. Deleted guests should not appear in normal guest lists.
5. Guest contact information is host/co-host only.

---

## Budget System

Owns:

1. Budget target.
2. Expenses.
3. Estimated costs.
4. Actual costs.
5. Projected total.
6. Cost per attendee.
7. Expense categories.

Does not own:

1. RSVP source of truth.
2. Payments or money movement.
3. Reimbursements beyond simple status tracking.

Primary tables:

1. `events` for `budget_target_cents` and currency.
2. `expenses`.
3. `guests` for attendee count reads.

Primary services:

1. `BudgetService`.

Important methods:

```text
setBudgetTarget(userId, eventId, amountCents, currency)
createExpense(userId, eventId, input)
updateExpense(userId, eventId, expenseId, input)
deleteExpense(userId, eventId, expenseId)
getBudgetSummary(userId, eventId)
calculateProjectedTotal(expenses)
calculateCostPerAttendee(projectedTotal, attendeeCount)
```

System invariants:

1. Money must be stored in integer minor units.
2. Negative amounts are invalid.
3. Budget calculations are server-authoritative.
4. Guests cannot access budget data in MVP.
5. Expense deletion should not corrupt historical activity records.

---

## Food and Supplies System

Owns:

1. Food item planning.
2. Supply item planning.
3. Guest item claiming.
4. Item status.
5. Unclaimed item tracking.
6. Food/supply costs if entered.

Does not own:

1. Budget expense records, although future linking is possible.
2. Guest RSVP status beyond checking valid guest identity.
3. Notification delivery.

Primary tables:

1. `food_supply_items`.
2. Future: `food_supply_claims`.

Primary services:

1. `FoodSupplyService`.

Important methods:

```text
createItem(userId, eventId, input)
updateItem(userId, eventId, itemId, input)
deleteItem(userId, eventId, itemId)
claimItem(inviteSlug, guestId, itemId)
unclaimItem(inviteSlug, guestId, itemId)
listItemsForHost(userId, eventId)
listItemsForGuest(inviteSlug, optionalGuestId)
getFoodSummary(eventId)
```

System invariants:

1. Item claim must respect event-level claiming settings.
2. Item claim must respect item-level claimable setting.
3. Item cannot be over-claimed.
4. Concurrent claims must be transaction-safe.
5. Guest can only unclaim their own claim unless host overrides.

---

## Task Management System

Owns:

1. Event tasks.
2. Assignments.
3. Due dates.
4. Status changes.
5. Priorities.
6. Guest task completion when enabled.
7. Overdue task calculations.

Does not own:

1. Guest contact management.
2. Notification delivery.
3. Calendar reminders, except future integration.

Primary tables:

1. `tasks`.

Primary services:

1. `TaskService`.

Important methods:

```text
createTask(userId, eventId, input)
updateTask(userId, eventId, taskId, input)
deleteTask(userId, eventId, taskId)
completeTaskAsHost(userId, eventId, taskId)
completeTaskAsGuest(inviteSlug, guestId, taskId)
listTasksForHost(userId, eventId, filters)
listTasksForGuest(inviteSlug, guestId)
getTaskSummary(eventId)
```

System invariants:

1. Task status controls `completed_at`.
2. Guest can only complete tasks assigned to them and visible to them.
3. Host/co-host can override any task.
4. Deleted tasks should not appear in normal task lists.
5. Overdue means due date is before today and status is not done.

---

## Notification System

Owns:

1. Email invitations.
2. RSVP reminders.
3. Event updates.
4. Task assignment notices.
5. Email send status.
6. Retry behavior.
7. Message previews.

Does not own:

1. Guest source-of-truth data.
2. RSVP mutation.
3. Event details beyond rendering templates.

Primary tables:

1. `notification_messages`.
2. `notification_recipients`.
3. Background job queue storage.

Primary services:

1. `NotificationService`.
2. `EmailService`.
3. `MessageTemplateService`.

Important methods:

```text
previewMessage(eventId, messageType, audience)
sendEventInvites(userId, eventId, guestIds)
sendRsvpReminder(userId, eventId, guestIds)
sendEventUpdate(userId, eventId, guestIds, message)
enqueueEmail(emailPayload)
recordDeliveryStatus(providerMessageId, status)
```

System invariants:

1. Email sending should not block core RSVP or event creation flows.
2. Failed email sends should be retryable.
3. Guest emails must not be exposed to other guests.
4. Message sending must respect rate limits.
5. Bulk sending should require verified host email or verified account state.

---

## Activity and Audit System

Owns:

1. Event activity records.
2. Important planning changes.
3. Lightweight audit history.
4. Future activity feed.

Does not own:

1. Full database versioning.
2. Legal/compliance audit logs for enterprise use.

Primary tables:

1. `event_activities`.

Primary services:

1. `ActivityService`.

Important methods:

```text
recordActivity(eventId, actor, actionType, entityType, entityId, metadata)
listRecentActivity(userId, eventId)
```

Events to record:

1. Event created.
2. Event updated.
3. Guest added.
4. Guest RSVP updated.
5. Expense added.
6. Expense updated.
7. Food item claimed.
8. Task created.
9. Task completed.
10. Invite email sent.

System invariants:

1. Activity logging should not break core user actions if it fails.
2. Activity metadata must not store sensitive raw secrets.
3. Activity should reference entities by ID.

---

## Analytics System

Owns:

1. Product event tracking.
2. Funnel metrics.
3. Activation metrics.
4. Retention metrics.
5. Guest-to-host conversion tracking.

Does not own:

1. Operational logs.
2. Error monitoring.
3. Core application state.

Primary services:

1. `AnalyticsService`.

Important methods:

```text
track(userIdOrAnonymousId, eventName, properties)
identify(userId, traits)
trackGuestEvent(anonymousId, eventName, properties)
```

System invariants:

1. Do not send personal notes, dietary restrictions, addresses, emails, or phone numbers to analytics.
2. Analytics failure must not break product flows.
3. Use anonymous IDs for guest page behavior until user identity exists.

---

## Public Event Page System

Owns:

1. Guest-safe event rendering.
2. Guest-specific state from invite token.
3. Public RSVP entry point.
4. Guest-visible food items.
5. Guest-visible assigned tasks.
6. Confirmation page.

Does not own:

1. Host dashboard.
2. Budget information.
3. Private guest list details.

Primary services:

1. `PublicEventPageService`.
2. `PublicEventSerializer`.

Important methods:

```text
getPublicEventPageData(inviteSlug, optionalInviteToken)
serializePublicEvent(event)
serializeGuestVisibleFoodItems(eventId, guestId)
serializeGuestVisibleTasks(eventId, guestId)
```

System invariants:

1. Public serializer must default to deny private fields.
2. Guest token should prefill only that guest’s information.
3. Public event page must handle invalid and expired links gracefully.

---

## Admin and Support System: Post-MVP

Owns:

1. User lookup for support.
2. Event lookup for support.
3. Abuse investigation.
4. Manual account actions.
5. Email delivery troubleshooting.

MVP recommendation:

Do not build a full admin panel initially. Use database/admin provider tools with strict access controls until support volume justifies custom tooling.

---

## 24.1.6 Data Ownership Matrix

| Data Entity | Owning System | Read Consumers | Write Consumers |
|---|---|---|---|
| User | Identity | Event, Notification, Analytics | Identity |
| Event | Event Management | All event modules | Event Management |
| Co-host | Event Management / Permissions | Permissions | Event Management |
| Guest | Guest Management | RSVP, Notifications, Tasks, Food | Guest Management, RSVP |
| RSVP status | Invite and RSVP | Dashboard, Guest Management, Analytics | RSVP, Guest Management |
| Expense | Budget | Dashboard, Analytics | Budget |
| Food/Supply Item | Food and Supplies | Dashboard, Public Page | Food and Supplies |
| Task | Task Management | Dashboard, Public Page | Task Management |
| Notification Message | Notification | Activity, Support | Notification |
| Activity | Activity and Audit | Dashboard, Support | All systems via ActivityService |
| Analytics Event | Analytics | Product analytics tools | AnalyticsService |

---

## 24.1.7 Core Data Flows

## Flow A: Host Creates Event

```text
Host Browser
  -> POST /api/v1/events
    -> Auth middleware validates session
    -> EventController validates input
    -> PermissionService verifies authenticated user can create event
    -> EventService creates event
      -> generate invite slug
      -> insert events row
      -> record event.created activity
      -> track event_created analytics
    -> API returns event ID and invite URL
  -> Frontend navigates to event dashboard
```

Failure cases:

1. Invalid input returns `400`.
2. Unauthenticated request returns `401`.
3. Database write failure returns `500` and logs error.

---

## Flow B: Guest Opens Invite Link

```text
Guest Browser
  -> GET /e/:inviteSlug
    -> PublicEventPageService loads event by invite slug
    -> PublicAccessService checks event visibility
    -> PublicEventSerializer removes private fields
    -> Optional token preloads matching guest RSVP state
    -> Page renders event details and RSVP form
```

Failure cases:

1. Invalid slug shows event-not-found page.
2. Invite-only event without valid token shows restricted access page.
3. Archived event shows read-only state.
4. Deleted event shows not-found page.

---

## Flow C: Guest Submits RSVP

```text
Guest Browser
  -> POST /api/v1/public/events/:inviteSlug/rsvp
    -> Rate limiter checks IP + inviteSlug
    -> RsvpController validates input
    -> InviteService loads event
    -> PublicAccessService verifies RSVP allowed
    -> RsvpService validates deadline, closure, and plus-one rules
    -> RsvpService matches or creates guest record
    -> Database transaction updates RSVP state
    -> ActivityService records guest.rsvp_updated
    -> AnalyticsService tracks rsvp_submitted
    -> API returns confirmation
  -> Frontend shows confirmation page
```

Failure cases:

1. RSVP closed returns `403`.
2. Party size exceeds limit returns `400`.
3. Invite-only guest not found returns `403` or restricted response.
4. Rate limit exceeded returns `429`.

---

## Flow D: Host Views Dashboard

```text
Host Browser
  -> GET /api/v1/events/:eventId/dashboard
    -> Auth middleware validates session
    -> PermissionService requires host/co-host access
    -> EventDashboardService loads event summary
      -> GuestService gets RSVP summary
      -> BudgetService gets budget summary
      -> FoodSupplyService gets food summary
      -> TaskService gets task summary
    -> API returns dashboard payload
  -> Frontend renders dashboard cards and next actions
```

Failure cases:

1. Unauthenticated request returns `401`.
2. Authenticated but unauthorized request returns `403`.
3. Deleted event returns `404`.

---

## Flow E: Host Adds Expense

```text
Host Browser
  -> POST /api/v1/events/:eventId/expenses
    -> Auth validates session
    -> PermissionService checks budget permission
    -> BudgetController validates input
    -> BudgetService creates expense
    -> ActivityService records expense.created
    -> AnalyticsService tracks expense_created
    -> API returns expense
  -> Frontend invalidates expenses and dashboard queries
```

Failure cases:

1. Negative amount returns `400`.
2. Missing estimated and actual amount returns `400`.
3. Unauthorized user returns `403`.

---

## Flow F: Guest Claims Food Item

```text
Guest Browser
  -> POST /api/v1/public/events/:inviteSlug/food-supplies/:itemId/claim
    -> Rate limiter checks request
    -> PublicAccessService validates public event access
    -> FoodSupplyService validates guest identity
    -> FoodSupplyService opens DB transaction
      -> locks item row
      -> checks item claimable
      -> checks claimed_count < needed_count
      -> writes claim state
      -> updates item status if needed
    -> ActivityService records food_item.claimed
    -> API returns updated item
```

Failure cases:

1. Item already claimed returns `409`.
2. Claiming disabled returns `403`.
3. Invalid guest identity returns `403`.

---

## Flow G: Host Sends Email Invites

```text
Host Browser
  -> POST /api/v1/events/:eventId/messages/send
    -> Auth validates session
    -> PermissionService checks guest management permission
    -> NotificationService creates notification message
    -> NotificationService creates recipient rows
    -> NotificationService enqueues email jobs
    -> API returns queued status

Worker
  -> Pulls email jobs
  -> Renders email template
  -> Sends through provider
  -> Updates recipient status
  -> Records notification activity
```

Failure cases:

1. Missing guest emails are skipped and reported.
2. Provider failure marks recipient failed and retries if transient.
3. Unverified sender/account may be blocked from bulk send.

---

## 24.1.8 API Layer Architecture

API route handlers should be thin.

Route handler responsibilities:

1. Parse request.
2. Validate schema.
3. Read auth context.
4. Call domain service.
5. Convert service result to HTTP response.
6. Convert known errors to standard API errors.

Route handlers should not:

1. Contain business calculations.
2. Directly build complex database queries unless trivial.
3. Duplicate permission logic.
4. Leak database models directly to public clients.

Recommended structure:

```text
src/
  app/
    api/
      v1/
        events/
        public/
        auth/
  modules/
    auth/
    events/
    guests/
    rsvp/
    budget/
    food-supplies/
    tasks/
    notifications/
    permissions/
    activity/
    analytics/
  db/
    schema/
    migrations/
    client.ts
  lib/
    validation/
    errors/
    logging/
    rate-limit/
```

---

## 24.1.9 Domain Service Architecture

Each domain module should have:

```text
module-name/
  controllers or routes
  service
  repository
  schemas
  serializers
  types
  tests
```

Example:

```text
modules/rsvp/
  rsvp.service.ts
  rsvp.repository.ts
  rsvp.schemas.ts
  rsvp.serializer.ts
  rsvp.types.ts
  rsvp.service.test.ts
```

Layer responsibilities:

### Schemas

1. Validate request inputs.
2. Define form constraints.
3. Reuse between frontend and backend where safe.

### Services

1. Enforce business rules.
2. Coordinate repositories.
3. Call permission checks.
4. Create activity records.
5. Emit analytics events.

### Repositories

1. Encapsulate database access.
2. Return typed persistence objects.
3. Avoid business decisions.

### Serializers

1. Convert internal models to API-safe responses.
2. Remove private fields.
3. Shape data for host or guest views.

---

## 24.1.10 Data Layer Architecture

Recommended data layer:

1. PostgreSQL as source of truth.
2. ORM or query builder for type-safe queries.
3. Redis or managed queue storage for background jobs.
4. Object storage for files and images.

Data layer rules:

1. Use database constraints for critical integrity.
2. Use application validation for user-friendly errors.
3. Use transactions for multi-step writes.
4. Use row locks for claim conflicts.
5. Avoid storing derived dashboard metrics unless performance requires it.
6. Soft-delete user-generated entities where recovery/audit is useful.

Transaction-required operations:

1. RSVP update that creates or updates guest plus activity.
2. Food item claim.
3. Bulk guest import.
4. Sending notification batch metadata.
5. Event deletion/archive with dependent updates.

---

## 24.1.11 Read Models and Aggregation

MVP can compute summaries on read.

Server-computed read models:

1. Event dashboard.
2. RSVP summary.
3. Budget summary.
4. Food summary.
5. Task summary.

Do not calculate these independently on the client as the source of truth.

Potential future optimization:

1. `event_summary_snapshots` table.
2. Materialized views.
3. Cache dashboard response by event ID.
4. Invalidate cache on relevant mutations.

Recommended MVP approach:

1. Use direct aggregate queries.
2. Add indexes first.
3. Add caching only after measuring bottlenecks.

---

## 24.1.12 Frontend Architecture

Frontend should be separated into host app and public guest app.

Recommended frontend directories:

```text
src/
  app/
    app/
      events/
    e/
      [inviteSlug]/
  components/
    ui/
    event/
    guests/
    budget/
    food-supplies/
    tasks/
    public-event/
  hooks/
  lib/
    api-client/
    formatters/
    analytics/
    dates/
  schemas/
  types/
```

Frontend boundaries:

1. Host components can use authenticated APIs.
2. Public guest components can only use public APIs.
3. Shared UI components must not contain domain business logic.
4. Domain components can format data but should not own server-authoritative calculations.
5. API client should centralize error handling.

Recommended frontend state:

1. Server state: TanStack Query, SWR, or framework equivalent.
2. Form state: React Hook Form or equivalent.
3. Local UI state: React state.
4. Global app state: minimal; session and layout only.

Avoid:

1. Duplicating server entities in a global client store.
2. Calculating budget source-of-truth on client.
3. Keeping stale RSVP counts after mutation.

---

## 24.1.13 Backend Architecture

Backend should be organized as a modular domain application.

Recommended backend request lifecycle:

```text
HTTP Request
  -> Request ID middleware
  -> Logging middleware
  -> Rate limit middleware where applicable
  -> Auth middleware if protected route
  -> Route handler
  -> Schema validation
  -> Permission check
  -> Domain service
  -> Repository/database
  -> Serializer
  -> Response
```

Backend cross-cutting concerns:

1. Authentication.
2. Authorization.
3. Input validation.
4. Error handling.
5. Logging.
6. Rate limiting.
7. Analytics event emission.
8. Activity logging.
9. Transaction management.

Error handling:

1. Domain services throw typed application errors.
2. API layer maps typed errors to status codes.
3. Unknown errors are logged and return generic `500`.
4. Public endpoints should avoid revealing resource existence when privacy-sensitive.

---

## 24.1.14 Background Job Architecture

Recommended job system:

1. Queue-backed async workers.
2. Retry support.
3. Dead-letter or failed-job tracking.
4. Idempotency keys for email jobs.
5. Separate worker process from web process.

Job categories:

```text
email.send
email.batch_send
notification.rsvp_reminder
notification.event_update
analytics.flush
cleanup.deleted_events
```

Email job payload example:

```json
{
  "jobType": "email.send",
  "notificationRecipientId": "uuid",
  "template": "event_invitation",
  "to": "guest@example.com",
  "eventId": "uuid",
  "guestId": "uuid",
  "idempotencyKey": "event_invite:uuid:guest_uuid"
}
```

Worker rules:

1. Job handlers must be idempotent.
2. Jobs should update persistent send status.
3. Transient failures should retry with backoff.
4. Permanent failures should be marked failed.
5. Workers should not expose secrets in logs.

---

## 24.1.15 Integration Architecture

## Email Provider

Used for:

1. Password reset.
2. Email verification.
3. Event invitations.
4. RSVP reminders.
5. Event updates.

Integration approach:

1. Wrap provider calls inside `EmailService`.
2. Do not call provider directly from route handlers.
3. Store provider message IDs.
4. Use webhooks for delivery status if available.

## Analytics Provider

Used for:

1. Product usage tracking.
2. Funnels.
3. Retention.
4. Guest-to-host conversion.

Integration approach:

1. Wrap provider in `AnalyticsService`.
2. Strip personal data.
3. Make analytics non-blocking.

## Error Monitoring

Used for:

1. Frontend exceptions.
2. Backend exceptions.
3. Worker failures.

Integration approach:

1. Attach request ID.
2. Attach user ID where available.
3. Attach event ID where relevant.
4. Avoid sending sensitive payloads.

## Maps Provider: Optional

Used for:

1. Address autocomplete.
2. Map preview.
3. Directions link.

MVP recommendation:

Use plain address and external map link first. Add maps provider later.

## Object Storage: Optional MVP

Used for:

1. Event banner images.
2. Future attachments.
3. Future post-event photos.

MVP recommendation:

Defer unless event images are required for launch.

---

## 24.1.16 Deployment Architecture

Recommended MVP deployment topology:

```text
+----------------------------+
| CDN / Edge Network         |
+-------------+--------------+
              |
              v
+----------------------------+       +-------------------------+
| Web App / API Server       | <---> | PostgreSQL Database     |
| Next.js or API service     |       +-------------------------+
+-------------+--------------+
              |
              v
+----------------------------+       +-------------------------+
| Background Worker          | <---> | Redis / Queue           |
+-------------+--------------+       +-------------------------+
              |
              v
+----------------------------+
| External Services          |
| Email / Analytics / Sentry |
+----------------------------+
```

Minimum production components:

1. Web/API runtime.
2. PostgreSQL database.
3. Background worker, if sending email asynchronously.
4. Queue or job provider.
5. Email provider.
6. Error monitoring.
7. Analytics.

Environment separation:

1. Development.
2. Preview/staging.
3. Production.

Production requirements:

1. HTTPS enforced.
2. Secrets managed outside code.
3. Database backups enabled.
4. Error monitoring enabled.
5. Rate limits enabled.
6. Logs retained for debugging.

---

## 24.1.17 Caching Strategy

MVP caching should be conservative.

Recommended caching:

1. Static assets cached through CDN.
2. Public invite page can use short-lived cache only if RSVP-specific state is not included.
3. Dashboard API can avoid caching initially.
4. Client-side query cache for recently loaded host data.
5. No caching for permissions.
6. No caching for RSVP submission responses.

Cache invalidation triggers:

1. Guest RSVP changes invalidate dashboard and guest list.
2. Expense changes invalidate dashboard and budget summary.
3. Food item changes invalidate dashboard and food list.
4. Task changes invalidate dashboard and task list.
5. Event settings changes invalidate public invite page.

Future caching:

1. Cache event dashboard for short TTL.
2. Cache public event shell separately from guest-specific state.
3. Use stale-while-revalidate for invite page details.

---

## 24.1.18 Security Architecture

Security boundaries:

1. Authenticated host app boundary.
2. Public invite page boundary.
3. Backend API boundary.
4. Background worker boundary.
5. Third-party provider boundary.

Core security controls:

1. Session authentication for host routes.
2. Invite slug and invite token for guest flows.
3. Centralized permission checks.
4. Public-safe serializers.
5. Input validation on every mutation.
6. Rate limits on public endpoints.
7. CSRF protection for cookie-authenticated mutations.
8. Secure, HTTP-only cookies.
9. HTTPS only.
10. No secrets in frontend bundles.

Most important security rule:

**Never reuse host-facing serializers for public invite responses.**

Public response allowlist:

1. Event name.
2. Event date/time.
3. Public description/instructions.
4. Public location fields.
5. Host display name.
6. RSVP settings needed to render form.
7. Guest’s own RSVP state if valid token is present.
8. Guest-visible food items.
9. Guest-visible assigned tasks.

Public response denylist:

1. Budget.
2. Guest emails.
3. Guest phone numbers.
4. Private notes.
5. Internal IDs unless needed and safe.
6. Notification history.
7. Activity metadata.
8. Co-host permissions.

---

## 24.1.19 Reliability Architecture

Reliability priorities:

1. RSVP submissions must not be lost.
2. Item claims must not double-book.
3. Email failures must not break event planning.
4. Dashboard calculations must be consistent.
5. Public invite page must degrade gracefully.

Reliability controls:

1. Database transactions for critical writes.
2. Unique constraints for invite slugs and invite tokens.
3. Queue retries for email jobs.
4. Idempotency keys for bulk sends.
5. Request IDs for tracing.
6. Error monitoring for API and frontend.
7. Database backups.
8. Graceful error messages for guest flows.

Critical path operations:

1. Create event.
2. Load invite page.
3. Submit RSVP.
4. Update RSVP.
5. Claim food item.

Non-critical side effects:

1. Analytics tracking.
2. Activity logging.
3. Email sending.
4. Notification status webhooks.

Rule:

Non-critical side effects should not block critical path operations unless legally or product-critical.

---

## 24.1.20 Scalability Architecture

Initial bottlenecks will likely be:

1. Public invite page traffic spikes.
2. Guest list queries for larger events.
3. Email sending throughput.
4. Dashboard aggregate queries.

MVP scaling tactics:

1. Index all foreign keys and common filters.
2. Paginate guest list.
3. Paginate activity feed if added.
4. Use background jobs for email.
5. Use aggregate queries instead of loading all rows.
6. Avoid heavy client bundles on public invite page.

Future scaling tactics:

1. Cached public event shell.
2. Materialized dashboard summaries.
3. Dedicated notification service.
4. Read replicas.
5. CDN for media.
6. Event-based analytics pipeline.

Architecture should support future service extraction by keeping module boundaries clean.

---

## 24.1.21 Suggested Codebase Structure

Recommended TypeScript monorepo-style structure, even if deployed as one app:

```text
apps/
  web/
    src/
      app/
      components/
      hooks/
      lib/
      styles/
  worker/
    src/
      jobs/
      workers/
packages/
  domain/
    src/
      events/
      guests/
      rsvp/
      budget/
      food-supplies/
      tasks/
      permissions/
  db/
    prisma-or-schema/
    migrations/
    seed/
  config/
  ui/
  shared/
    src/
      types/
      schemas/
      constants/
```

Simpler MVP alternative:

```text
src/
  app/
  components/
  modules/
  db/
  jobs/
  lib/
```

Recommendation:

Use the simpler MVP structure unless the team is already comfortable with monorepos.

---

## 24.1.22 System Dependency Rules

Allowed dependencies:

1. API routes may depend on domain services.
2. Domain services may depend on repositories, permission service, activity service, and analytics service.
3. Repositories may depend on database client only.
4. Serializers may depend on types and formatting helpers.
5. Frontend components may depend on API clients and shared schemas.
6. Background jobs may depend on domain services where appropriate.

Avoid:

1. Repositories calling services.
2. Services importing UI code.
3. Public modules importing host-only serializers.
4. Notification system mutating RSVP state directly.
5. Analytics system becoming required for core workflows.
6. Route handlers performing direct complex DB mutations.

Dependency direction:

```text
UI -> API Client -> API Route -> Domain Service -> Repository -> Database
                              -> Activity/Analytics/Notification interfaces
```

---

## 24.1.23 Architecture Decisions

## Decision 1: Modular Monolith First

Decision:

Build a modular monolith for MVP.

Reason:

The domains are tightly connected, and the product needs speed, consistency, and low infrastructure complexity.

Consequence:

Need strong code boundaries to avoid creating a tangled monolith.

## Decision 2: PostgreSQL as Source of Truth

Decision:

Use PostgreSQL for core data.

Reason:

The app has relational entities, transactional workflows, and aggregate reporting needs.

Consequence:

Schema design and migrations need discipline.

## Decision 3: Guests Are Not Users by Default

Decision:

Guests can RSVP without creating user accounts.

Reason:

Low-friction RSVP is essential.

Consequence:

Need separate guest identity model and invite-token access flow.

## Decision 4: Public and Host Serializers Are Separate

Decision:

Use separate serializers for public invite data and authenticated host data.

Reason:

Prevents accidental data leaks.

Consequence:

More code, but much safer.

## Decision 5: Budget Is Private in MVP

Decision:

Budget data is host/co-host only.

Reason:

Most casual hosts will not want guests to see spending details by default.

Consequence:

Guest APIs must never include budget fields.

## Decision 6: Email Sending Is Async

Decision:

Use background jobs for sending emails.

Reason:

Provider failures should not block app actions.

Consequence:

Need worker infrastructure if email sending ships in MVP.

## Decision 7: Server Owns Calculations

Decision:

Dashboard, budget, attendee count, and claim status calculations are server-authoritative.

Reason:

Prevents inconsistent clients and stale derived values.

Consequence:

Frontend invalidates and refetches after mutations.

---

## 24.1.24 Architecture Risks

## Risk: Modular Monolith Becomes Tangled

Mitigation:

1. Enforce module boundaries.
2. Keep services domain-specific.
3. Use repositories for data access.
4. Add tests around domain services.

## Risk: Public Invite Link Leaks Private Data

Mitigation:

1. Separate public serializer.
2. Denylist sensitive fields.
3. Add tests for public API payloads.
4. Review every public endpoint before launch.

## Risk: RSVP Duplicates Pollute Guest List

Mitigation:

1. Match by invite token first.
2. Match by email when available.
3. Prevent duplicate email per event.
4. Add host cleanup tools.

## Risk: Email Provider Failures Affect Invites

Mitigation:

1. Async job queue.
2. Retry logic.
3. Send status tracking.
4. Copyable invite link as fallback.

## Risk: Dashboard Queries Become Slow

Mitigation:

1. Use aggregate SQL.
2. Add indexes.
3. Paginate lists.
4. Add cached summaries later if needed.

---

## 24.1.25 Architecture Release Criteria

Architecture is ready for MVP build when:

1. Domain modules are defined.
2. Database schema is approved.
3. API route structure is approved.
4. Permission model is approved.
5. Public invite serializer is defined.
6. RSVP flow is transactionally safe.
7. Food claim flow is transactionally safe.
8. Email system is either deferred or job-based.
9. Observability requirements are defined.
10. Deployment topology is agreed.

---

## 24.2 Application Modules

## 24.2.1 Frontend Modules

The frontend should be organized around product domains:

1. `auth`.
2. `events`.
3. `guests`.
4. `rsvps`.
5. `budget`.
6. `food-supplies`.
7. `tasks`.
8. `settings`.
9. `notifications`.
10. `shared-ui`.
11. `analytics`.

Recommended route structure:

```text
/
/login
/signup
/forgot-password
/app/events
/app/events/new
/app/events/:eventId
/app/events/:eventId/guests
/app/events/:eventId/budget
/app/events/:eventId/food-supplies
/app/events/:eventId/tasks
/app/events/:eventId/settings
/e/:inviteSlug
/e/:inviteSlug/rsvp
/e/:inviteSlug/confirmation
```

Host routes should live under `/app`. Guest-facing invite routes should live under `/e/:inviteSlug`.

## 24.2.2 Backend Modules

Backend modules:

1. Auth/session management.
2. User management.
3. Event management.
4. Event permission service.
5. Guest management.
6. RSVP service.
7. Budget/expense service.
8. Food and supplies service.
9. Task service.
10. Invite service.
11. Notification service.
12. Analytics event service.
13. Audit/activity service.

Each write operation should pass through:

1. Input validation.
2. Authentication or invite-token validation.
3. Authorization check.
4. Business-rule validation.
5. Database transaction if multiple records are affected.
6. Activity/event logging where relevant.

---

## 24.3 Database Schema

PostgreSQL is recommended. All tables should use UUID primary keys unless there is a clear reason to use sequential IDs. Timestamps should use UTC.

## 24.3.1 Enum Definitions

Recommended enums:

```sql
CREATE TYPE event_status AS ENUM ('draft', 'active', 'archived', 'deleted');
CREATE TYPE event_visibility AS ENUM ('link_public', 'link_rsvp_invited_only', 'invite_only');
CREATE TYPE location_type AS ENUM ('physical', 'virtual', 'hybrid', 'tbd');
CREATE TYPE rsvp_status AS ENUM ('invited', 'going', 'maybe', 'not_going', 'no_response');
CREATE TYPE expense_category AS ENUM ('food', 'drinks', 'venue', 'decorations', 'supplies', 'entertainment', 'gifts', 'transportation', 'other');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'reimbursed', 'not_applicable');
CREATE TYPE food_supply_status AS ENUM ('needed', 'claimed', 'purchased', 'prepared', 'completed');
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'blocked', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE assignee_type AS ENUM ('host', 'cohost', 'guest', 'external');
CREATE TYPE activity_actor_type AS ENUM ('user', 'guest', 'system');
```

## 24.3.2 Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  avatar_url TEXT,
  email_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
```

Notes:

1. `password_hash` can be nullable if using OAuth or managed auth.
2. Soft delete is recommended for account recovery and data retention workflows.

## 24.3.3 Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_user_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  event_type TEXT,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  location_type location_type NOT NULL DEFAULT 'tbd',
  location_name TEXT,
  address TEXT,
  virtual_link TEXT,
  dress_code TEXT,
  instructions TEXT,
  rsvp_deadline TIMESTAMPTZ,
  rsvps_closed BOOLEAN NOT NULL DEFAULT false,
  plus_one_allowed BOOLEAN NOT NULL DEFAULT false,
  max_plus_ones_per_guest INTEGER NOT NULL DEFAULT 0,
  visibility event_visibility NOT NULL DEFAULT 'link_public',
  guest_list_visible BOOLEAN NOT NULL DEFAULT false,
  food_claiming_enabled BOOLEAN NOT NULL DEFAULT true,
  task_guest_interaction_enabled BOOLEAN NOT NULL DEFAULT true,
  budget_target_cents INTEGER,
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  invite_slug TEXT NOT NULL UNIQUE,
  status event_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_events_host_user_id ON events(host_user_id);
CREATE INDEX idx_events_invite_slug ON events(invite_slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
```

Rules:

1. `invite_slug` must be cryptographically random or sufficiently unguessable.
2. `budget_target_cents` should store money in minor units, not decimal floats.
3. `currency` should use ISO 4217 codes.

## 24.3.4 Event Co-Hosts Table

```sql
CREATE TABLE event_cohosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  can_edit_event BOOLEAN NOT NULL DEFAULT true,
  can_manage_guests BOOLEAN NOT NULL DEFAULT true,
  can_manage_budget BOOLEAN NOT NULL DEFAULT true,
  can_manage_food BOOLEAN NOT NULL DEFAULT true,
  can_manage_tasks BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_cohosts_event_id ON event_cohosts(event_id);
CREATE INDEX idx_event_cohosts_user_id ON event_cohosts(user_id);
```

MVP may simplify this to all co-hosts having full edit access.

## 24.3.5 Guests Table

```sql
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rsvp_status rsvp_status NOT NULL DEFAULT 'no_response',
  party_size INTEGER NOT NULL DEFAULT 1,
  dietary_restrictions TEXT,
  note TEXT,
  invite_token TEXT NOT NULL UNIQUE,
  invitation_sent_at TIMESTAMPTZ,
  rsvp_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_guests_event_id ON guests(event_id);
CREATE INDEX idx_guests_invite_token ON guests(invite_token);
CREATE INDEX idx_guests_event_rsvp_status ON guests(event_id, rsvp_status);
CREATE INDEX idx_guests_event_email ON guests(event_id, email);
```

Rules:

1. `party_size` includes the guest.
2. Minimum party size is 1.
3. Maximum party size is `1 + event.max_plus_ones_per_guest` when plus-ones are enabled.
4. Guest email is optional for public-link events.
5. Guest email may be required for invite-only events.

## 24.3.6 Expenses Table

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category expense_category NOT NULL DEFAULT 'other',
  estimated_amount_cents INTEGER,
  actual_amount_cents INTEGER,
  paid_by_name TEXT,
  paid_by_user_id UUID REFERENCES users(id),
  payment_status payment_status NOT NULL DEFAULT 'not_applicable',
  expense_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_expenses_event_id ON expenses(event_id);
CREATE INDEX idx_expenses_event_category ON expenses(event_id, category);
```

Rules:

1. Amounts must be non-negative.
2. At least one of `estimated_amount_cents` or `actual_amount_cents` should be present.
3. Soft delete is acceptable for auditability.

## 24.3.7 Food and Supply Items Table

```sql
CREATE TABLE food_supply_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  quantity NUMERIC(10,2),
  unit TEXT,
  needed_count INTEGER NOT NULL DEFAULT 1,
  claimed_count INTEGER NOT NULL DEFAULT 0,
  claimed_by_guest_id UUID REFERENCES guests(id),
  claimed_by_user_id UUID REFERENCES users(id),
  claimed_by_name TEXT,
  estimated_cost_cents INTEGER,
  actual_cost_cents INTEGER,
  status food_supply_status NOT NULL DEFAULT 'needed',
  is_guest_claimable BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_food_supply_event_id ON food_supply_items(event_id);
CREATE INDEX idx_food_supply_event_status ON food_supply_items(event_id, status);
CREATE INDEX idx_food_supply_claimed_guest ON food_supply_items(claimed_by_guest_id);
```

MVP simplification:

1. Treat each item as claimable by one person.
2. Add multi-claim support later with a separate `food_supply_claims` table.

Future multi-claim schema:

```sql
CREATE TABLE food_supply_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_supply_item_id UUID NOT NULL REFERENCES food_supply_items(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id),
  user_id UUID REFERENCES users(id),
  claimant_name TEXT,
  quantity_claimed NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 24.3.8 Tasks Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assignee_type assignee_type,
  assignee_user_id UUID REFERENCES users(id),
  assignee_guest_id UUID REFERENCES guests(id),
  assignee_name TEXT,
  due_date DATE,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'not_started',
  visibility TEXT NOT NULL DEFAULT 'host_only',
  created_by_user_id UUID REFERENCES users(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_tasks_event_id ON tasks(event_id);
CREATE INDEX idx_tasks_event_status ON tasks(event_id, status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_assignee_guest ON tasks(assignee_guest_id);
CREATE INDEX idx_tasks_assignee_user ON tasks(assignee_user_id);
```

Rules:

1. `completed_at` should be set when status changes to `done`.
2. `completed_at` should be cleared if status changes away from `done`.
3. Guests can only update assigned tasks if guest task interaction is enabled.

## 24.3.9 Event Activities Table

```sql
CREATE TABLE event_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  actor_type activity_actor_type NOT NULL,
  actor_user_id UUID REFERENCES users(id),
  actor_guest_id UUID REFERENCES guests(id),
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_event_activities_event_id ON event_activities(event_id);
CREATE INDEX idx_event_activities_created_at ON event_activities(created_at);
```

Activity examples:

1. `event.created`.
2. `event.updated`.
3. `guest.added`.
4. `guest.rsvp_updated`.
5. `expense.created`.
6. `food_item.claimed`.
7. `task.completed`.

## 24.3.10 Notification Messages Table

```sql
CREATE TABLE notification_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES users(id),
  channel TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notification_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_message_id UUID NOT NULL REFERENCES notification_messages(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id),
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notification_messages_event_id ON notification_messages(event_id);
CREATE INDEX idx_notification_recipients_message_id ON notification_recipients(notification_message_id);
```

MVP may defer these tables if only copyable messages are supported.

---

## 24.4 API Specification

The API can be REST, GraphQL, or tRPC. REST is used here for clarity. All API responses should return JSON. All write endpoints should validate request bodies with a schema validation library such as Zod, Yup, Valibot, or Joi.

## 24.4.1 API Conventions

Base path:

```text
/api/v1
```

Standard success response:

```json
{
  "data": {},
  "meta": {}
}
```

Standard error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": []
  }
}
```

Common HTTP status codes:

1. `200 OK` for successful reads and updates.
2. `201 Created` for successful creation.
3. `204 No Content` for successful deletion.
4. `400 Bad Request` for invalid input.
5. `401 Unauthorized` when no valid session/token exists.
6. `403 Forbidden` when user lacks permission.
7. `404 Not Found` when resource does not exist or should not be revealed.
8. `409 Conflict` for duplicate or conflicting operations.
9. `429 Too Many Requests` for rate limits.
10. `500 Internal Server Error` for unexpected failures.

## 24.4.2 Auth Endpoints

### POST `/auth/signup`

Creates a host account.

Request:

```json
{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "password": "secure-password"
}
```

Response:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "name": "Alex Morgan",
      "email": "alex@example.com"
    }
  }
}
```

Validation:

1. Name required.
2. Email must be valid.
3. Password must meet security requirements.
4. Email must be unique.

### POST `/auth/login`

Authenticates user and starts a session.

### POST `/auth/logout`

Ends current session.

### POST `/auth/password-reset/request`

Sends password reset email.

### POST `/auth/password-reset/confirm`

Confirms token and changes password.

---

## 24.4.3 Event Endpoints

### GET `/events`

Returns events visible to authenticated user as host or co-host.

Query params:

1. `status`.
2. `timeframe` with values `upcoming`, `past`, `all`.
3. `limit`.
4. `cursor`.

Response:

```json
{
  "data": {
    "events": [
      {
        "id": "uuid",
        "name": "Birthday Dinner",
        "eventDate": "2026-06-12",
        "startTime": "19:00",
        "timezone": "America/New_York",
        "locationName": "Home",
        "status": "active",
        "rsvpSummary": {
          "going": 8,
          "maybe": 2,
          "notGoing": 1,
          "noResponse": 5
        }
      }
    ]
  },
  "meta": {
    "nextCursor": null
  }
}
```

### POST `/events`

Creates an event.

Request:

```json
{
  "name": "Birthday Dinner",
  "eventType": "birthday",
  "eventDate": "2026-06-12",
  "startTime": "19:00",
  "endTime": "23:00",
  "timezone": "America/New_York",
  "locationType": "physical",
  "locationName": "Alex's Apartment",
  "address": "123 Main St",
  "description": "Dinner and games.",
  "rsvpDeadline": "2026-06-08T23:59:00Z",
  "plusOneAllowed": true,
  "maxPlusOnesPerGuest": 1,
  "visibility": "link_public",
  "currency": "USD"
}
```

Response:

```json
{
  "data": {
    "event": {
      "id": "uuid",
      "inviteSlug": "abc123secure",
      "inviteUrl": "https://app.example.com/e/abc123secure"
    }
  }
}
```

### GET `/events/:eventId`

Returns full host-facing event details.

Permission:

Host or co-host only.

### PATCH `/events/:eventId`

Updates event details.

Permission:

Host or co-host with edit permission.

### DELETE `/events/:eventId`

Soft-deletes or archives an event.

Permission:

Host only for MVP.

### GET `/events/:eventId/dashboard`

Returns aggregated dashboard data.

Response:

```json
{
  "data": {
    "event": {},
    "rsvpSummary": {
      "invited": 20,
      "going": 10,
      "maybe": 3,
      "notGoing": 2,
      "noResponse": 5,
      "attendeeCount": 13
    },
    "budgetSummary": {
      "budgetTargetCents": 50000,
      "estimatedTotalCents": 42000,
      "actualTotalCents": 15000,
      "projectedTotalCents": 43000,
      "remainingBudgetCents": 7000,
      "projectedCostPerPersonCents": 3308
    },
    "foodSummary": {
      "totalItems": 14,
      "unclaimedItems": 5,
      "incompleteItems": 9
    },
    "taskSummary": {
      "totalTasks": 12,
      "incompleteTasks": 7,
      "overdueTasks": 2
    }
  }
}
```

---

## 24.4.4 Guest and RSVP Endpoints

### GET `/events/:eventId/guests`

Returns host-facing guest list.

Query params:

1. `rsvpStatus`.
2. `search`.
3. `limit`.
4. `cursor`.

Permission:

Host or co-host.

### POST `/events/:eventId/guests`

Creates a guest.

Request:

```json
{
  "name": "Sam Lee",
  "email": "sam@example.com",
  "phone": "+15555555555"
}
```

### POST `/events/:eventId/guests/bulk`

Bulk creates guests.

Request:

```json
{
  "guests": [
    { "name": "Sam Lee", "email": "sam@example.com" },
    { "name": "Taylor Kim", "email": "taylor@example.com" }
  ]
}
```

Rules:

1. Maximum 500 guests per bulk request.
2. Duplicate emails within same event should be flagged.
3. Invalid rows should return structured errors.

### PATCH `/events/:eventId/guests/:guestId`

Updates guest details or RSVP manually.

### DELETE `/events/:eventId/guests/:guestId`

Soft-deletes guest.

### GET `/public/events/:inviteSlug`

Returns guest-facing event details.

Response should exclude:

1. Budget data.
2. Private host notes.
3. Guest contact information.
4. Host-only tasks.

### POST `/public/events/:inviteSlug/rsvp`

Creates or updates RSVP for public-link event.

Request:

```json
{
  "name": "Sam Lee",
  "email": "sam@example.com",
  "rsvpStatus": "going",
  "partySize": 2,
  "dietaryRestrictions": "Vegetarian",
  "note": "Excited!"
}
```

Response:

```json
{
  "data": {
    "guest": {
      "id": "uuid",
      "name": "Sam Lee",
      "rsvpStatus": "going",
      "partySize": 2
    },
    "confirmationMessage": "You're marked as going."
  }
}
```

Rules:

1. Public-link mode may create a new guest record if no match exists.
2. Invite-only RSVP mode must match existing guest by token or email.
3. Party size must respect plus-one settings.
4. RSVP should be blocked if `rsvps_closed` is true.
5. If RSVP deadline has passed but RSVPs are not closed, allow RSVP and show warning.

### POST `/public/events/:inviteSlug/rsvp/token/:inviteToken`

Updates RSVP for a pre-invited guest.

Recommended for email invite links.

---

## 24.4.5 Budget Endpoints

### GET `/events/:eventId/expenses`

Returns all non-deleted expenses.

### POST `/events/:eventId/expenses`

Creates expense.

Request:

```json
{
  "name": "Pizza",
  "category": "food",
  "estimatedAmountCents": 8000,
  "actualAmountCents": 7600,
  "paidByName": "Alex",
  "paymentStatus": "paid",
  "expenseDate": "2026-06-10",
  "notes": "Ordered from local shop."
}
```

### PATCH `/events/:eventId/expenses/:expenseId`

Updates expense.

### DELETE `/events/:eventId/expenses/:expenseId`

Soft-deletes expense.

### GET `/events/:eventId/budget-summary`

Returns budget calculations only.

---

## 24.4.6 Food and Supplies Endpoints

### GET `/events/:eventId/food-supplies`

Returns host-facing list.

### POST `/events/:eventId/food-supplies`

Creates item.

Request:

```json
{
  "name": "Paper plates",
  "category": "plates/cups/cutlery",
  "quantity": 50,
  "unit": "count",
  "neededCount": 1,
  "estimatedCostCents": 1200,
  "status": "needed",
  "isGuestClaimable": true,
  "notes": "Compostable preferred."
}
```

### PATCH `/events/:eventId/food-supplies/:itemId`

Updates item.

### DELETE `/events/:eventId/food-supplies/:itemId`

Deletes or soft-deletes item.

### POST `/public/events/:inviteSlug/food-supplies/:itemId/claim`

Guest claims an item.

Request:

```json
{
  "guestId": "uuid",
  "guestName": "Sam Lee"
}
```

Rules:

1. Event must have food claiming enabled.
2. Item must be guest-claimable.
3. Item must not already be fully claimed.
4. Claim should run in a transaction to prevent double-claim conflicts.

### POST `/public/events/:inviteSlug/food-supplies/:itemId/unclaim`

Guest unclaims item if they are the claimant.

---

## 24.4.7 Task Endpoints

### GET `/events/:eventId/tasks`

Returns tasks visible to host/co-host.

Query params:

1. `status`.
2. `assigneeId`.
3. `priority`.
4. `dueBefore`.

### POST `/events/:eventId/tasks`

Creates task.

Request:

```json
{
  "title": "Buy ice",
  "description": "Get two bags before guests arrive.",
  "assigneeType": "guest",
  "assigneeGuestId": "uuid",
  "dueDate": "2026-06-12",
  "priority": "high",
  "visibility": "assigned_guest"
}
```

### PATCH `/events/:eventId/tasks/:taskId`

Updates task.

### DELETE `/events/:eventId/tasks/:taskId`

Soft-deletes task.

### POST `/public/events/:inviteSlug/tasks/:taskId/complete`

Allows assigned guest to complete task.

Rules:

1. Event must allow guest task interaction.
2. Task must be visible to guest.
3. Guest must be assigned to task.

---

## 24.4.8 Notification Endpoints

### POST `/events/:eventId/messages/preview`

Generates a reminder or update message without sending.

Request:

```json
{
  "messageType": "rsvp_reminder",
  "audience": "no_response"
}
```

Response:

```json
{
  "data": {
    "subject": "Reminder: RSVP for Birthday Dinner",
    "body": "Hi! Please RSVP for Birthday Dinner by June 8...",
    "recipientCount": 5
  }
}
```

### POST `/events/:eventId/messages/send`

Sends email to selected audience.

MVP can defer actual sending and support copyable text only.

---

## 24.5 Authorization Rules

Authorization should be centralized in a permission service instead of duplicated inside controllers.

## 24.5.1 Role Types

1. Host.
2. Co-host.
3. Guest.
4. Anonymous visitor.

## 24.5.2 Permission Checks

Recommended service functions:

```text
canViewHostDashboard(userId, eventId)
canEditEvent(userId, eventId)
canManageGuests(userId, eventId)
canManageBudget(userId, eventId)
canManageFood(userId, eventId)
canManageTasks(userId, eventId)
canViewInvitePage(inviteSlug, tokenOrIdentity)
canSubmitRsvp(inviteSlug, tokenOrIdentity)
canClaimFoodItem(inviteSlug, guestId, itemId)
canCompleteTask(inviteSlug, guestId, taskId)
```

## 24.5.3 Security Rules

1. Host dashboard access always requires authenticated user.
2. Public invite page should never return host-only fields.
3. Budget data is host/co-host only for MVP.
4. Guest contact details should never be visible to other guests.
5. Invite-only events should return `404` or generic access error when token is invalid.
6. Public RSVP endpoint should be rate-limited by IP and invite slug.
7. All mutations must verify event status is not deleted.

---

## 24.6 Validation Rules

## 24.6.1 Event Validation

1. `name`: required, 1 to 120 characters.
2. `description`: optional, max 5,000 characters.
3. `eventDate`: required, valid date.
4. `startTime`: required.
5. `endTime`: optional, must be after start time if same date.
6. `timezone`: required, must be valid IANA timezone.
7. `currency`: required, valid ISO 4217 code.
8. `maxPlusOnesPerGuest`: integer from 0 to 10.
9. `rsvpDeadline`: optional, should be before event start.
10. `inviteSlug`: generated by server, not client-controlled.

## 24.6.2 Guest Validation

1. `name`: required, 1 to 120 characters.
2. `email`: optional unless invite-only flow requires it.
3. `phone`: optional, normalized where possible.
4. `partySize`: integer, minimum 1.
5. `dietaryRestrictions`: optional, max 1,000 characters.
6. `note`: optional, max 2,000 characters.

## 24.6.3 Expense Validation

1. `name`: required, 1 to 120 characters.
2. `estimatedAmountCents`: optional, non-negative integer.
3. `actualAmountCents`: optional, non-negative integer.
4. At least one amount field required.
5. `category`: must be a supported category.
6. `notes`: optional, max 2,000 characters.

## 24.6.4 Food/Supply Validation

1. `name`: required, 1 to 120 characters.
2. `category`: required.
3. `quantity`: optional, non-negative number.
4. `neededCount`: integer, minimum 1.
5. `claimedCount`: cannot exceed `neededCount`.
6. Cost fields must be non-negative integers.

## 24.6.5 Task Validation

1. `title`: required, 1 to 160 characters.
2. `description`: optional, max 3,000 characters.
3. `dueDate`: optional.
4. `priority`: required.
5. `status`: required.
6. If `assigneeType` is guest, `assigneeGuestId` should be present.
7. If `assigneeType` is host or cohost, `assigneeUserId` should be present.

---

## 24.7 Business Logic Details

## 24.7.1 Dashboard Aggregation

Dashboard should be generated server-side to avoid inconsistent client calculations.

Recommended aggregation:

1. Query RSVP counts grouped by status.
2. Calculate attendee count from Going guests and party size.
3. Calculate budget totals from non-deleted expenses.
4. Count unclaimed and incomplete food/supply items.
5. Count incomplete and overdue tasks.
6. Return one dashboard payload.

## 24.7.2 RSVP Matching Logic

For public-link events:

1. If guest submits with email and matching guest exists for event, update existing guest.
2. Else if guest submits with same normalized name and no email, optionally update likely match only if unambiguous.
3. Else create new guest.

For invite-only events:

1. Prefer invite token.
2. If no token, require email.
3. Match email to pre-invited guest.
4. If no match, reject RSVP.

## 24.7.3 Duplicate Guest Handling

MVP:

1. Prevent duplicate email within the same event when email exists.
2. Allow duplicate names.
3. Let host manually delete duplicates.

Post-MVP:

1. Suggest possible duplicates by name similarity and email domain.
2. Support merge guest records.

## 24.7.4 Food Claim Race Condition Handling

Claim endpoint should execute in a transaction:

1. Lock item row with `SELECT ... FOR UPDATE`.
2. Check `claimed_count < needed_count`.
3. Apply claim.
4. Update status to `claimed` if claim count reaches needed count.
5. Commit.

If already claimed, return `409 Conflict`.

## 24.7.5 Task Completion Logic

When status changes to `done`:

1. Set `completed_at` to now.
2. Create activity event.

When status changes away from `done`:

1. Clear `completed_at`.
2. Create activity event.

## 24.7.6 Budget Calculation Logic

For each expense:

1. Estimated total uses `estimated_amount_cents` only.
2. Actual total uses `actual_amount_cents` only.
3. Projected total uses `actual_amount_cents` when available, otherwise `estimated_amount_cents`.

Per-person calculation:

1. Use projected total.
2. Divide by attendee count.
3. If attendee count is zero, return null.

---

## 24.8 Frontend State and UX Technical Requirements

## 24.8.1 Data Fetching

Recommended approach:

1. Use server-rendered or preloaded data for invite page.
2. Use client-side query library such as TanStack Query for dashboard modules.
3. Cache event dashboard data briefly.
4. Invalidate related queries after mutations.

Examples:

1. RSVP update invalidates dashboard and guests.
2. Expense mutation invalidates expenses and budget summary.
3. Task mutation invalidates tasks and dashboard.
4. Food item mutation invalidates food/supplies and dashboard.

## 24.8.2 Forms

Recommended form requirements:

1. Use shared validation schema where possible.
2. Show inline field errors.
3. Disable submit while request is pending.
4. Prevent duplicate submissions.
5. Preserve entered values on validation error.
6. Use optimistic updates only for low-risk interactions.

## 24.8.3 Empty States

Required empty states:

1. No events yet.
2. No guests yet.
3. No RSVPs yet.
4. No expenses yet.
5. No food/supply items yet.
6. No tasks yet.
7. No matching filtered results.

Each empty state should include a single clear action.

## 24.8.4 Loading States

Required loading states:

1. Full-page loading for initial authenticated app shell.
2. Skeleton cards for dashboard metrics.
3. Table loading for guests, expenses, tasks.
4. Button-level loading for form submission.

## 24.8.5 Error States

Required error states:

1. Invalid invite link.
2. Event not found.
3. RSVP closed.
4. Permission denied.
5. Network failure.
6. Validation failure.
7. Item already claimed.
8. Session expired.

---

## 24.9 Email and Notification Technical Spec

## 24.9.1 Email Types

MVP or near-MVP email types:

1. Email verification.
2. Password reset.
3. Event invitation.
4. RSVP reminder.
5. Event update.
6. Task assignment notification.
7. Food item claim confirmation.

## 24.9.2 Email Sending Requirements

1. Email sending should be asynchronous.
2. Store send status per recipient.
3. Retry transient failures.
4. Do not retry permanent failures indefinitely.
5. Include unsubscribe or notification preference handling when required.
6. Avoid exposing all guest emails in recipient headers.

## 24.9.3 Email Invite Link Strategy

For pre-invited guests, email links should include both:

1. Event invite slug.
2. Guest invite token.

Example:

```text
/e/:inviteSlug?token=:inviteToken
```

This allows the RSVP form to pre-fill guest identity securely.

---

## 24.10 Analytics Instrumentation

## 24.10.1 Product Events

Track these events:

1. `user_signed_up`.
2. `user_logged_in`.
3. `event_created`.
4. `event_updated`.
5. `invite_link_copied`.
6. `guest_added`.
7. `guests_bulk_added`.
8. `invite_page_viewed`.
9. `rsvp_submitted`.
10. `rsvp_updated`.
11. `expense_created`.
12. `budget_target_set`.
13. `food_item_created`.
14. `food_item_claimed`.
15. `task_created`.
16. `task_completed`.
17. `message_previewed`.
18. `message_sent`.
19. `event_archived`.
20. `guest_became_host`.

## 24.10.2 Event Properties

Common properties:

1. `user_id` where available.
2. `event_id`.
3. `event_type`.
4. `guest_count`.
5. `rsvp_status`.
6. `source`.
7. `device_type`.
8. `browser`.
9. `is_guest_flow`.

Privacy rule:

Do not send names, emails, phone numbers, notes, addresses, or dietary restrictions to analytics tools unless explicitly approved by privacy review.

---

## 24.11 Observability

## 24.11.1 Logging

Log structured events for:

1. Authentication failures.
2. Permission denials.
3. RSVP submissions.
4. Email send attempts.
5. Background job failures.
6. Rate-limit violations.
7. Unexpected API errors.

Logs should include:

1. Request ID.
2. User ID if authenticated.
3. Event ID if relevant.
4. Endpoint.
5. Status code.
6. Latency.
7. Error code.

Do not log sensitive guest notes, passwords, reset tokens, or full invite tokens.

## 24.11.2 Metrics

Operational metrics:

1. API request count by endpoint.
2. API latency p50, p95, p99.
3. API error rate.
4. RSVP submission success rate.
5. Email send success/failure rate.
6. Background job queue depth.
7. Database query latency.
8. Invite page load time.

## 24.11.3 Alerts

Recommended alerts:

1. API 5xx rate exceeds threshold.
2. RSVP submission errors exceed threshold.
3. Email provider failure rate exceeds threshold.
4. Background queue has stuck jobs.
5. Database connection pool saturation.
6. Invite page latency exceeds threshold.

---

## 24.12 Security Specification

## 24.12.1 Authentication Security

1. Passwords must be hashed using bcrypt, Argon2, or managed-auth equivalent.
2. Sessions should use secure, HTTP-only cookies where possible.
3. CSRF protection required for cookie-authenticated mutations.
4. Password reset tokens must expire.
5. Password reset tokens must be single-use.
6. Email verification should be required before sending large invitation batches.

## 24.12.2 Public Invite Security

1. Invite slugs should be long and unguessable.
2. Guest invite tokens should be long and unguessable.
3. Public RSVP endpoint should be rate-limited.
4. Input should be sanitized before rendering.
5. Host-only fields should be excluded at query/serialization layer.
6. Deleted or archived events should not accept RSVPs.

## 24.12.3 Data Protection

1. Encrypt data in transit with HTTPS.
2. Encrypt production database at rest using provider-managed encryption.
3. Restrict production database access.
4. Use least-privilege API keys.
5. Rotate secrets when exposed or on regular schedule.
6. Store secrets in environment secret manager, not source control.

## 24.12.4 Abuse Prevention

1. Rate-limit RSVP submissions by IP and event.
2. Rate-limit invite page requests for suspicious traffic.
3. Rate-limit email sends per event and per account.
4. Add CAPTCHA only if abuse appears; avoid adding friction upfront.
5. Detect large guest imports from unverified accounts.

---

## 24.13 Privacy and Compliance Requirements

## 24.13.1 Personal Data Collected

Personal data may include:

1. Host name.
2. Host email.
3. Guest name.
4. Guest email.
5. Guest phone.
6. Dietary restrictions.
7. Guest notes.
8. Event location/address.
9. RSVP status.
10. Task assignments.

## 24.13.2 Data Minimization

1. Guest email should be optional unless needed for invite-only access or email invitations.
2. Guest phone should be optional.
3. Budget data should not be collected from guests.
4. Analytics should avoid personal fields.

## 24.13.3 Deletion and Retention

MVP policy recommendation:

1. Host can delete an event.
2. Deleted event is soft-deleted immediately.
3. Soft-deleted events are permanently deleted after a retention window, such as 30 or 90 days.
4. Guests can request removal through host or support flow.
5. Account deletion should delete or anonymize hosted events depending on product policy.

---

## 24.14 Testing Strategy

## 24.14.1 Unit Tests

Test:

1. RSVP validation.
2. Plus-one calculations.
3. Budget calculations.
4. Attendee count calculations.
5. Permission service.
6. Food claim rules.
7. Task status transitions.
8. Invite slug/token generation.

## 24.14.2 Integration Tests

Test API flows:

1. Signup, login, create event.
2. Create event and submit RSVP.
3. Invite-only RSVP with valid token.
4. Invite-only RSVP with invalid token.
5. Budget CRUD and summary.
6. Food claim race condition.
7. Task assignment and completion.
8. Guest cannot access host dashboard.
9. Guest cannot see budget.

## 24.14.3 End-to-End Tests

Critical E2E tests:

1. Host creates event and copies invite link.
2. Guest opens invite link and RSVPs.
3. Host sees updated RSVP count.
4. Host adds expense and sees budget update.
5. Host adds food item and guest claims it.
6. Host creates task and marks it complete.
7. Unauthorized visitor cannot open dashboard route.

Recommended tool:

Playwright or Cypress.

## 24.14.4 Manual QA Checklist

Manual QA should cover:

1. Desktop Chrome.
2. Desktop Safari.
3. Mobile Safari.
4. Chrome Android.
5. Slow network simulation.
6. Public-link event.
7. Invite-only event.
8. Event with zero guests.
9. Event with 100 guests.
10. Long event names and descriptions.
11. Special characters in guest names and notes.
12. Time zone display.

---

## 24.15 Deployment and Environments

## 24.15.1 Environments

Required environments:

1. Local development.
2. Preview/staging.
3. Production.

Each environment should have separate:

1. Database.
2. Auth configuration.
3. Email provider configuration.
4. Analytics project.
5. Error monitoring project.
6. Environment variables.

## 24.15.2 CI/CD

Recommended pipeline:

1. Install dependencies.
2. Type check.
3. Lint.
4. Run unit tests.
5. Run integration tests.
6. Build app.
7. Run database migration checks.
8. Deploy preview for pull requests.
9. Deploy to production after main branch merge.

## 24.15.3 Database Migrations

Requirements:

1. Migrations must be version-controlled.
2. Production migrations should be backward-compatible when possible.
3. Destructive migrations require manual review.
4. Rollback plan required for high-risk migrations.

## 24.15.4 Backups

Production database requirements:

1. Automated daily backups.
2. Point-in-time recovery if supported by provider.
3. Restore process tested before public launch.
4. Backup access restricted.

---

## 24.16 Scalability Assumptions

## 24.16.1 MVP Load Assumptions

Initial target:

1. 10,000 registered hosts.
2. 50,000 events.
3. 1,000,000 guest records.
4. 100 guests per typical upper-bound event.
5. Occasional spikes when invite links are shared.

## 24.16.2 Scaling Strategy

Near-term scaling:

1. Add database indexes on frequently queried fields.
2. Cache public invite page reads where safe.
3. Use background jobs for email.
4. Paginate guest lists and activity feeds.
5. Avoid loading all event details on dashboard when only summary is needed.

Future scaling:

1. Read replicas for high read volume.
2. Dedicated notification service.
3. CDN caching for public event assets.
4. Separate analytics/event pipeline.

---

## 24.17 Accessibility Technical Requirements

Implementation requirements:

1. Use semantic HTML for forms, buttons, headings, and tables.
2. All form inputs must have labels.
3. Error messages should be associated with fields using ARIA attributes.
4. Modals should trap focus and close with Escape.
5. Keyboard users must be able to complete RSVP flow.
6. RSVP status controls must be accessible radio buttons or equivalent.
7. Tables should have proper headers.
8. Color-only status indicators must include text labels.
9. Minimum contrast should meet WCAG 2.1 AA.

---

## 24.18 Internationalization and Localization

MVP can be English-only, but technical design should avoid blocking localization.

Requirements:

1. Store event timezone explicitly.
2. Store money in minor units plus currency.
3. Format dates/times based on locale where possible.
4. Avoid hardcoding user-facing strings deep inside business logic.
5. Support international phone formats if phone is collected.

Post-MVP:

1. Multi-language UI.
2. Locale-specific date/time formatting.
3. Multi-currency display.

---

## 24.19 Recommended Component Inventory

Shared UI components:

1. Button.
2. Input.
3. Textarea.
4. Select.
5. Radio group.
6. Checkbox.
7. Date picker.
8. Time picker.
9. Modal.
10. Drawer for mobile forms.
11. Toast.
12. Alert.
13. Badge.
14. Status pill.
15. Data table.
16. Empty state.
17. Loading skeleton.
18. Confirmation dialog.
19. Currency input.
20. Invite link copy card.
21. RSVP summary cards.
22. Budget summary cards.
23. Task list item.
24. Food/supply item card.

---

## 24.20 Recommended Domain Services

Implement domain logic in services rather than directly in route handlers.

Recommended services:

```text
EventService
GuestService
RsvpService
BudgetService
FoodSupplyService
TaskService
PermissionService
InviteService
NotificationService
ActivityService
AnalyticsService
```

Example service responsibilities:

### EventService

1. Create event.
2. Update event.
3. Archive/delete event.
4. Generate invite slug.
5. Return event dashboard.

### RsvpService

1. Validate RSVP input.
2. Match guest identity.
3. Apply RSVP update.
4. Enforce plus-one rules.
5. Log RSVP activity.

### BudgetService

1. Create expense.
2. Update expense.
3. Delete expense.
4. Calculate budget summary.
5. Validate currency and amount rules.

### FoodSupplyService

1. Create item.
2. Update item.
3. Claim item.
4. Unclaim item.
5. Enforce claim limits.

### TaskService

1. Create task.
2. Update task.
3. Complete task.
4. Enforce assignee permissions.
5. Calculate overdue tasks.

---

## 24.21 Implementation Milestones

## Milestone 1: Foundation

Deliverables:

1. Project setup.
2. Database setup.
3. Auth setup.
4. User model.
5. Event model.
6. Basic app layout.
7. Event create/edit screens.
8. Event list.

Exit criteria:

1. User can sign up and create an event.
2. User can see event in event list.
3. User can edit event details.

## Milestone 2: Invite and RSVP

Deliverables:

1. Invite slug generation.
2. Public invite page.
3. RSVP form.
4. Guest table.
5. RSVP summary.
6. Public RSVP API.

Exit criteria:

1. Host can share invite link.
2. Guest can RSVP without account.
3. Host sees RSVP update.

## Milestone 3: Guest Management

Deliverables:

1. Manual guest creation.
2. Bulk guest import.
3. Guest edit/delete.
4. RSVP filters.
5. Invite-only RSVP mode.

Exit criteria:

1. Host can manage guest list fully.
2. Invite-only RSVP mode works.

## Milestone 4: Budget

Deliverables:

1. Expense CRUD.
2. Budget target.
3. Budget summary.
4. Cost per attendee.
5. Budget dashboard module.

Exit criteria:

1. Host can track estimated and actual costs.
2. Budget calculations are correct.

## Milestone 5: Food and Supplies

Deliverables:

1. Food/supply CRUD.
2. Category grouping.
3. Guest claiming.
4. Unclaimed item summary.

Exit criteria:

1. Host can create claimable items.
2. Guest can claim item if enabled.
3. Double-claim conflicts are prevented.

## Milestone 6: Tasks

Deliverables:

1. Task CRUD.
2. Assignment.
3. Due dates.
4. Status changes.
5. Overdue dashboard summary.
6. Guest task completion if enabled.

Exit criteria:

1. Host can manage event tasks.
2. Assigned guest can complete visible task.

## Milestone 7: Notifications and Polish

Deliverables:

1. Copyable reminder messages.
2. Optional email invite integration.
3. Analytics events.
4. Error monitoring.
5. Mobile polish.
6. Accessibility pass.

Exit criteria:

1. Core beta-ready experience is complete.
2. Product analytics are active.
3. Critical errors are monitored.

---

## 24.22 Technical Launch Checklist

Before beta launch:

1. Production database provisioned.
2. Database backups enabled.
3. HTTPS enabled.
4. Environment variables configured.
5. Error monitoring enabled.
6. Analytics enabled.
7. Rate limits configured for public endpoints.
8. Email domain verified if sending email.
9. Privacy policy drafted.
10. Terms drafted.
11. Seed test data removed from production.
12. Admin/debug endpoints disabled or protected.
13. E2E tests pass on critical flows.
14. Mobile RSVP flow manually tested.
15. Invite-only access manually tested.
16. Dashboard permission checks tested.
17. Budget calculations tested.
18. Food claim conflict tested.
19. Password reset tested.
20. Backup restore procedure documented.

---

## 25. Launch Definition

A successful MVP launch means:

1. At least 20 beta hosts create real events.
2. At least 50% of created beta events receive one or more RSVPs.
3. At least 30% of beta events use one planning module beyond RSVPs.
4. Fewer than 5% of guests report RSVP friction.
5. No critical data loss or privacy bugs occur during beta.

---

## 26. Future Feature Backlog

## High-Value Future Features

1. Event templates by type.
2. Add-to-calendar integration.
3. Automated RSVP reminders.
4. SMS invites and reminders.
5. Expense splitting and payment links.
6. Polls for date, time, menu, or activity decisions.
7. Duplicate event.
8. Recurring events.
9. Guest groups.
10. Photo sharing after event.
11. Shared event memories page.
12. Vendor recommendations.
13. AI-generated checklist by event type.
14. AI menu planning based on guest count and dietary restrictions.
15. Weather integration for outdoor events.
16. Packing/supply checklist templates.
17. Advanced co-host permissions.
18. Public event page themes.

---

## 27. MVP Priority Order

Build in this order:

1. Auth and event creation.
2. Invite page and RSVP.
3. Guest dashboard and RSVP counts.
4. Guest management.
5. Budget tracker.
6. Food and supplies tracker.
7. Task tracker.
8. Event settings and privacy controls.
9. Email invites or copyable reminder messages.
10. Analytics and QA hardening.

---

## 28. Final MVP Definition

The MVP should answer one question:

**Can a host use this app to successfully plan a real small gathering with less coordination friction than chat, notes, and spreadsheets?**

The first version should focus on reliable planning primitives: event details, RSVPs, budget, food/supplies, and tasks. Avoid marketplaces, payments, and heavy social features until the core planning workflow proves valuable.

