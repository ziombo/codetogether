using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SignalRChat
{
	public class ChatHub : Hub
	{
		public static Dictionary<string, int> rooms = new Dictionary<string, int>();
		public void Test(string groupName)
		{
			if (!rooms.ContainsKey(groupName))
			{
				rooms.Add(groupName, 1);
				Accept();

			}
			else if(rooms[groupName] < 2)
			{
				rooms[groupName] += 1;
				Accept();
			}
			else
			{
				rooms[groupName] += 1;
				Redirect();
			}
			
		}

		public void Decrement(string groupName)
		{
			rooms[groupName] -= 1;
		}
		//show alert modal if group is full
		public Task Redirect()
		{
			return Clients.Caller.redirecting();
		}
		//if group isnt full connect to it
		public Task Accept()
		{
			return Clients.Caller.accepted();
		}

		public Task JoinGroup(string groupName)
		{ 
			return Groups.Add(Context.ConnectionId, groupName);	
		}


		public void Send(string groupName, string name, string message)
		{	
			Clients.Group(groupName).broadcastMessage(name, message);
		}
		
		public void Update(string groupName, string editorValue)
		{
			Clients.OthersInGroup(groupName).updateEditor(editorValue);
		}

		public void Change(string groupName, string mod)
		{
			Clients.OthersInGroup(groupName).modChange(mod);
		}

	}
}
