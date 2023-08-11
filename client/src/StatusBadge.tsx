import './StatusBadge.scss';

export default function StatusBadge({ status }) {
  
  return (
    <>
      <div className="badge ready">{status}</div>

    </>
  );
}
