type Props = {
  newsletter: string;
  setNewsletter: (value: string) => void;

  language: string;
  setLanguage: (value: string) => void;

  onPasswordClick: () => void;
  onEmailClick: () => void;
};

export function AccountSettings({
  newsletter,
  setNewsletter,
  language,
  setLanguage,
  onPasswordClick,
  onEmailClick,
}: Props) {
  return (
    <>
      <h2 className="sectionTitle">Account Settings</h2>

      <div className="card">
        <div className="cardRow" onClick={onPasswordClick}>
          <span className="cardLabel">Change Password</span>
        </div>

        <div className="cardRow" onClick={onEmailClick}>
          <span className="cardLabel">Change Email Address</span>
        </div>

        <div className="cardRowInline">
          <span className="cardLabel">
            Receive RockAuto Newsletter and Discount Emails?
          </span>

          <label className="radioLabel">
            <input
              type="radio"
              name="newsletter"
              checked={newsletter === "yes"}
              onChange={() => setNewsletter("yes")}
              className="radio"
            />
            Yes
          </label>

          <label className="radioLabel">
            <input
              type="radio"
              name="newsletter"
              checked={newsletter === "no"}
              onChange={() => setNewsletter("no")}
              className="radio"
            />
            No
          </label>
        </div>

        <div className="cardRowInline">
          <span className="cardLabel">Preferred Language for Emails</span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </>
  );
}
