const UserCountCard = ({ userCount, adminCount, technicianCount, selfCount }) => (
    <div className="d-flex justify-content-around m-4">
      <div className="card text-center" style={{ width: '120px', backgroundColor: '#F9EBEA' }}>
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          <p className="card-text">{userCount}</p>
        </div>
      </div>
      {/* <div className="card text-center" style={{ width: '120px', backgroundColor: '#D4E6F1' }}>
        <div className="card-body">
          <h5 className="card-title">Admins</h5>
          <p className="card-text">{adminCount}</p>
        </div>
      </div> */}
      <div className="card text-center" style={{ width: '125px', backgroundColor: '#F7DC6F' }}>
        <div className="card-body">
          <h5 className="card-title">Technicians</h5>
          <p className="card-text">{technicianCount}</p>
        </div>
      </div>
      <div className="card text-center" style={{ width: '140px', backgroundColor: '#A9DFBF' }}>
        <div className="card-body">
          <h5 className="card-title">SelfEmployee</h5>
          <p className="card-text">{selfCount}</p>
        </div>
      </div>
    </div>
)

export default UserCountCard