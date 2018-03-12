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
			},
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
	var lastMessage = (props.messages.length > 0) ? props.messages[ props.messages.length - 1 ].body : 'New chat';
	return (
		<li className="contact row mx-0 p-3 align-items-center" onClick={ props.onChangeChat }>
			<div className="thumbnail col pl-0 pr-3">
				<img className="rounded-circle" src={ props.contact.profilePic } />
			</div>
			<div className="summary col px-0">
				<h2 className="h6 my-0">{ props.contact.name }</h2>
				<p className="small text-muted font-italic mb-0">
					{ lastMessage }
				</p>
			</div>
		</li>
	)
}

Chat.propTypes = {
	contact: React.PropTypes.object.isRequired,
	messages: React.PropTypes.array.isRequired,
	onChangeChat: React.PropTypes.func.isRequired
}

var MessageForm = React.createClass({
	propTypes: {
		message: React.PropTypes.string,
		chat: React.PropTypes.number,
		sendMessage: React.PropTypes.func
	},
	getInitialState: function(){
		return {
			message: '',
		}
	},
	onTypeMessage: function(e){
		this.state.message = e.target.value;
		this.setState(this.state);
	},
	onSendMessage: function(e){
		e.preventDefault();
		this.props.sendMessage( this.state.message );
		this.setState({
			message: '',
		});
	},
	render: function(){
		return (
			<form id="sendMessage" className="d-flex justify-content-stretch col-12 px-4 py-3 border bg-light" onSubmit={ this.onSendMessage }>
				<textarea className="form-control" onChange={ this.onTypeMessage } value={ this.state.message }></textarea>
				<button className="btn btn-outline-warning px-5 ml-4">Send</button>
			</form>
		);
	}
});

var ContactForm = React.createClass({
	propTypes: {
		onCreateContact: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			name: '',
			phone: '',
			profilePic: ''
		}
	},
	onChangeName: function(e){
		this.state.name = e.target.value;
		this.setState(this.state);
	},
	onChangePhone: function(e){
		this.state.phone = e.target.value;
		this.setState(this.state);
	},
	onChangeProfilePic: function(e){
		this.state.profilePic = e.target.value;
		this.setState(this.state);
	},
	createContact: function(e){
		e.preventDefault();
		var contact = {
			contact: this.state,
			messages: [],
		}
		this.props.onCreateContact( contact );
		this.setState({
			name: '',
			phone: '',
			profilePic: ''
		});
	},
	render: function(){
		return (
			<form className="row mx-0" onSubmit={ this.createContact }>
				<div className="form-group col-12">
					<input type="text" className="form-control form-control-sm" placeholder="Name" 
					value={ this.state.name }
					onChange={ this.onChangeName }  />
				</div>
				<div className="form-group col-12">
					<input type="number" className="form-control form-control-sm" placeholder="Phone number" 
					value={ this.state.phone }
					onChange={ this.onChangePhone }  />
				</div>
				<div className="form-group col-12">
					<input type="text" className="form-control form-control-sm" placeholder="Profile pic url" 
					value={ this.state.profilePic }
					onChange={ this.onChangeProfilePic }  />
				</div>
				<div className="form-group col-12">
					<input type="submit" className="btn btn-outline-warning ox-4 py-1" value="Add" />
				</div>
			</form>
		);
	},
});

function EmptyMsg(){
	<h3>No msg</h3>
}

var Application = React.createClass({
	propTypes: {
		chats: React.PropTypes.array.isRequired	
	},
	getInitialState: function(){
		return {
			chats: this.props.chats,
			activeChat: this.props.chats[0],
			activeChatId: 0
		}
	},
	changeChat: function(index){
		this.state.activeChat = this.state.chats[index];
		this.state.activeChatId = index;
		this.setState( this.state );
	},
	sendMessage: function(msg){
		var newMessage = {
			author: 0,
			body: msg,
			meta: [
				{
					timestamp: '2018/03/18',
					status: 'read'
				}
			]
		}
		this.state.chats[this.state.activeChatId].messages.push(newMessage);
		this.setState(this.state);
	},
	saveContact: function(contact){
		this.state.chats.push(contact);
		this.changeChat( this.state.chats.length - 1);
	},
	render: function(){
		return (
			<div className="row mx-0">
				<aside className="col-12 px-0 col-lg-3">
					<ul className="list-unstyled mb-0">
						{ this.state.chats.map(function(chat,index){
							return (
								<Chat 
									key={index} 
									contact={ chat.contact } 
									messages={ chat.messages }
									onChangeChat={ function(){ this.changeChat(index); }.bind(this) }
									/>
							);
						},this)}
					</ul>
					<ContactForm onCreateContact={ function(contact){ this.saveContact(contact) }.bind(this) } />
				</aside>
				<main className="col-lg-9 row mx-0 px-0">
					<div id="listMessages" className="d-flex flex-column justify-content-end col-12 px-4">
						{ this.state.activeChat.messages.length > 0 
							? 
							(this.state.activeChat.messages.map(function(message, index){
								var msgClass = (message.author === 0) ? 'mine' : 'not-mine';
								return (
									<div key={index} className={'message message--' + msgClass + ' row mx-0 my-2'}>
										<div className="message_content py-1 px-3">
											<p className="small mb-0">{ message.body }</p>
										</div>
									</div>
								);
							}))
							:
							(<h3>No messages in this conv.</h3>)
						}
					</div>
					<MessageForm sendMessage={ function(msg){ this.sendMessage(msg) }.bind(this) } />
				</main>
			</div>
		);
	}
});

ReactDOM.render(<Application chats={CHATS} />, document.getElementById('app'));