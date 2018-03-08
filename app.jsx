var CHATS = [
	{
		contact: {
			name: 'Wolverine',
			phone: '555 1234567',
			profilePic: './img/logan.png'
		},
		messages: [
			{
				author: 0,
				body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				meta: [
					{
						timestamp: '2018/03/18',
						status: 'read'
					}
				]
			},
			{
				author: 2,
				body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				meta: [
					{
						timestamp: '2018/03/18',
						status: 'read'
					}
				]
			},
			{
				author: 0,
				body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				meta: [
					{
						timestamp: '2018/03/18',
						status: 'read'
					}
				]
			}
		],
	},
	{
		contact: {
			name: 'Cyclops',
			phone: '555 1234567',
			profilePic: './img/scott.png'
		},
		messages: [
			{
				author: 0,
				body: 'DAMN IT!',
				meta: [
					{
						timestamp: '2018/03/18',
						status: 'read'
					}
				]
			},
		],
	}
]

function Chat(props){
	var last = props.messages.length - 1;
	return (
		<li className="contact row mx-0 p-3 align-items-center">
			<div className="thumbnail col pl-0 pr-3">
				<img className="rounded-circle" src={ props.contact.profilePic } />
			</div>
			<div className="summary col px-0">
				<h2 className="h6 my-0">{ props.contact.name }</h2>
				<p className="small text-muted font-italic mb-0">
					{ props.messages[last].body }
				</p>
			</div>
		</li>
	)
}

Chat.propTypes = {
	contact: React.PropTypes.object.isRequired,
	messages: React.PropTypes.array.isRequired,
}

var Application = React.createClass({
	propTypes: {
		chats: React.PropTypes.array.isRequired	
	},
	getInitialState: function(){
		return {
			chats: this.props.chats,
			activeChat: this.props.chats[0]
		}
	},
	render: function(){
		return (
			<div className="row mx-0">
				<aside className="col-12 px-0 col-lg-3">
					<ul className="list-unstyled mb-0">
						{ this.state.chats.map(function(chat,index){
							return (
								<Chat key={index} contact={ chat.contact } messages={ chat.messages } />
							);
						})}
					</ul>
				</aside>
				<main className="d-flex flex-column justify-content-end col-12 px-4 col-lg-9 ">
					{ this.state.activeChat.messages.map(function(message, index){
						var msgClass = (message.author === 0) ? 'mine' : 'not-mine';
						return (
							<div key={index} className={'message message--' + msgClass + ' row mx-0 my-2'}>
								<div className="message_content py-1 px-3">
									<p className="small mb-0">{ message.body }</p>
								</div>
							</div>
						);
					})}
				</main>
			</div>
		);
	}
});

ReactDOM.render(<Application chats={CHATS} />, document.getElementById('app'));