// package com.wearecr.wearecrapplication.security.security_runners;

// import java.util.HashSet;
// import java.util.List;
// import java.util.Set;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.ApplicationArguments;
// import org.springframework.boot.ApplicationRunner;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Component;

// import com.wearecr.wearecrapplication.security.EnumeratedRoles;
// import com.wearecr.wearecrapplication.security.security_repositories.UserRepo;
// import com.wearecr.wearecrapplication.security.security_services.AuthServiceInterface;

// @Component
// public class AuthRunner implements ApplicationRunner {

// 	// @Autowired
// 	// RoleDAO roleRepository;
// 	@Autowired
// 	UserRepo userRepository;
// 	@Autowired
// 	PasswordEncoder passwordEncoder;
// 	@Autowired
// 	AuthServiceInterface authService;

// 	private Set<String> adminRole;
// 	private Set<String> moderatorRole;
// 	private Set<String> userRole;

// 	@Override
// 	public void run(ApplicationArguments args) throws Exception {
// 		System.out.println("Run...");
// 		// Metodo da lanciare solo la prima volta
// 		// Serve per salvare i ruoli nel DB
// 		// setRoleDefault();

// 	}

// 	private void setRoleDefault() {
// 		Role admin = new Role();
// 		admin.setRoleName(EnumeratedRoles.ADMIN);
// 		roleRepository.save(admin);

// 		Role user = new Role();
// 		user.setRoleName(EnumeratedRoles.USER);
// 		roleRepository.save(user);

// 		// adminRole = new HashSet<Role>();
// 		// adminRole.add(admin);
// 		// adminRole.add(moderator);
// 		// adminRole.add(user);
// 		//
// 		// moderatorRole = new HashSet<Role>();
// 		// moderatorRole.add(moderator);
// 		// moderatorRole.add(user);
// 		//
// 		// userRole = new HashSet<Role>();
// 		// userRole.add(user);
// 	}

// }
